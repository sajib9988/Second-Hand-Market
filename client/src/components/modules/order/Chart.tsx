'use client';

import { getMySellOrders } from '@/service/order';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


type OrderData = {
  date: string;
  totalOrders: number;
  totalAmount: number;
};

export const Chart = () => {
  const [orderData, setOrderData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await getMySellOrders();
        console.log(response);
        
        // Process and transform the data for the chart
        const processedData = response.result.map((order: any) => ({
          date: new Date(order.createdAt).toLocaleDateString(),
          totalAmount: order.totalAmount,
          totalOrders: 1
        }));

        // Aggregate data by date
        const aggregatedData = processedData.reduce((acc: OrderData[], curr :any) => {
          const existingDate = acc.find(item => item.date === curr.date);
          if (existingDate) {
            existingDate.totalOrders += curr.totalOrders;
            existingDate.totalAmount += curr.totalAmount;
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);

        setOrderData(aggregatedData);
      } catch (err) {
        setError('Failed to fetch seller order data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center h-64">{error}</div>;
  }

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Statistics</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={orderData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="totalOrders"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Total Orders"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalAmount"
            stroke="#82ca9d"
            name="Total Amount"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};