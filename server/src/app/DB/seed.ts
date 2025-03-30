import bcrypt from 'bcrypt';
import config from '../config';
import { UserRole } from '../modules/user/user.interface';
import User from '../modules/user/user.model';

const adminUser = {
    email: 'sajib4ome9@gmail.com',
    password: "123456",
    name: 'sajib2 biswas',
    role: UserRole.ADMIN,
    // clientInfo: {
    //     device: 'pc',
    //     browser: 'Unknown',
    //     ipAddress: '127.0.0.1',
    //     pcName: 'localhost',
    //     os: 'Unknown',
    //     userAgent: 'Seed Script',
    // }
};

const seedAdmin = async () => {
    try {
        // Check if an admin already exists
        const isAdminExist = await User.findOne({ role: UserRole.ADMIN });

        if (!isAdminExist) {
            await User.create(adminUser);

            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

export default seedAdmin;
