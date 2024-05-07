const express = require('express');
const app = express();
const db = require("./db.json");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors') ;
const config = require('./config');
const authRoutes = require('./authRoutes');

app.use(cors()); 
app.use(bodyParser.json());

//USER 

app.get('/User/GetCurrentUser', function (req, res) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        const userId = decoded.id;
        const user = db.users.find(user => user.id === userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
})

//ADMIN

app.post('/Admin/SaveAdminEmployeeRecord', function (req, res) {
    const updatedEmployeeRecord = req.body;

    if(updatedEmployeeRecord.id) {
        db.employeeRecords = db.employeeRecords.map(employeeRecord => employeeRecord.id === updatedEmployeeRecord.id ? updatedEmployeeRecord : employeeRecord);
    } else {
        const newId = Math.floor(Math.random() * 1000);

        db.employeeRecords.push({...updatedEmployeeRecord, id: newId});
    }

    res.json(true)
})

app.get('/Admin/GetAdminEmployeeRecord', function (req, res) {
    const employeeRecordId = parseInt(req.query.employeeRecordId);
    const employeeRecord = db.employeeRecords.find(employeeRecord => employeeRecord.id === employeeRecordId);

    res.json(employeeRecord)
})

app.get('/Admin/GetAdminEmployeeRecords', function (_, res) {
    res.json(db.employeeRecords)
})

app.delete('/Admin/DeleteAdminEmployeeRecord', function (req, res) {
    const employeeRecordId = parseInt(req.query.employeeRecordId);
    const newEmployeeRecords = db.employeeRecords.filter(employeeRecord => employeeRecord.id !== employeeRecordId);

    res.json(db.employeeRecords = newEmployeeRecords)
})

app.get('/Admin/GetAdminDepartment', function (req, res) {
    const departmentId = parseInt(req.query.departmentId);
    const department = db.departments.find(department => department.id === departmentId);

    res.json(department)
})

app.get('/Admin/GetAdminDepartments', function (_, res) {
    res.json(db.departments)
})

app.post('/Admin/SaveAdminDepartment', function (req, res) {
    const updatedDepartment = req.body;

    if(updatedDepartment.id) {
        db.departments = db.departments.map(department => department.id === updatedDepartment.id ? updatedDepartment : department);
    } else {
        const newId = Math.floor(Math.random() * 1000);

        db.departments.push({...updatedDepartment, id: newId});
    }

    res.json(true)
})

app.delete('/Admin/DeleteAdminDepartment', function (req, res) {
    const departmentId = parseInt(req.query.departmentId);
    const newDepartments = db.departments.filter(department => department.id !== departmentId);

    res.json(db.departments = newDepartments)
})

app.use('/Authentication', authRoutes);

app.get('/Authentication/validate-token', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ valid: false, message: 'Invalid token' });
        }
        // Token is valid
        res.json({ valid: true, decoded });
    });
});

app.listen(3000, () => {
    console.log("JSON Server is running");
})