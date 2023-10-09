const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    //console.log('getStudents');
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // check if email already exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.status(200).send('Email already exists.');
        }
    // add student to database
    pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send("Student added successfully!")
        console.log('Student added successfully!')
    })
    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    // check if student exists
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.status(200).send("Student does not exist in the databse.")
        }

        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send("Student deleted successfully!")
            console.log('Student deleted successfully!')
        })
        
    })

}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    // check if student exists
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.status(200).send("Student does not exist in the databse.")
        }

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send("Student updated successfully!")
            console.log('Student updated successfully!')
        })
        
    })

}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
}