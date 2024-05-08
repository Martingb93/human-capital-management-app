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

const authenticateServer = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        const userId = decoded.id;
        const user = db.users.find(user => user.id === userId);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

//USER 

app.get('/User/GetCurrentUser', authenticateServer, function (req, res) {
    res.json(req.user);
})

//ADMIN

app.post('/Admin/SaveAdminEmployeeRecord', authenticateServer, function (req, res) {
    const updatedEmployeeRecord = req.body;

    if(updatedEmployeeRecord.id) {
        db.employeeRecords = db.employeeRecords.map(employeeRecord => employeeRecord.id === updatedEmployeeRecord.id ? updatedEmployeeRecord : employeeRecord);
    } else {
        const newId = Math.floor(Math.random() * 1000);

        db.employeeRecords.push({...updatedEmployeeRecord, id: newId});
    }

    res.json(true)
})

app.get('/Admin/GetAdminEmployeeRecord', authenticateServer, function (req, res) {
    const employeeRecordId = parseInt(req.query.employeeRecordId);
    const employeeRecord = db.employeeRecords.find(employeeRecord => employeeRecord.id === employeeRecordId);

    res.json(employeeRecord)
})

app.get('/Admin/GetAdminEmployeeRecords', authenticateServer, function (_, res) {
    res.json(db.employeeRecords)
})

app.delete('/Admin/DeleteAdminEmployeeRecord', authenticateServer, function (req, res) {
    const employeeRecordId = parseInt(req.query.employeeRecordId);
    const newEmployeeRecords = db.employeeRecords.filter(employeeRecord => employeeRecord.id !== employeeRecordId);

    res.json(db.employeeRecords = newEmployeeRecords)
})

app.get('/Admin/GetAdminDepartment', authenticateServer, function (req, res) {
    const departmentId = parseInt(req.query.departmentId);
    const department = db.departments.find(department => department.id === departmentId);

    res.json(department)
})

app.get('/Admin/GetAdminDepartments', authenticateServer, function (_, res) {
    res.json(db.departments)
})

app.post('/Admin/SaveAdminDepartment', authenticateServer, function (req, res) {
    const updatedDepartment = req.body;

    if(updatedDepartment.id) {
        db.departments = db.departments.map(department => department.id === updatedDepartment.id ? updatedDepartment : department);
    } else {
        const newId = Math.floor(Math.random() * 1000);

        db.departments.push({...updatedDepartment, id: newId});
    }

    res.json(true)
})

app.delete('/Admin/DeleteAdminDepartment', authenticateServer, function (req, res) {
    const departmentId = parseInt(req.query.departmentId);
    const newDepartments = db.departments.filter(department => department.id !== departmentId);

    res.json(db.departments = newDepartments)
})

app.use('/Authentication', authRoutes);

app.listen(3000, () => {
    console.log("JSON Server is running");
})