// Example controller layer - handles HTTP requests/responses
const StudentService = require('../services/studentService');

class StudentController {
  static getAllStudents(req, res) {
    try {
      const students = StudentService.getAllStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static getStudentById(req, res) {
    try {
      const student = StudentService.getStudentById(req.params.id);
      res.json(student);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static createStudent(req, res) {
    try {
      const newStudent = StudentService.createStudent(req.body);
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static updateStudent(req, res) {
    try {
      const updated = StudentService.updateStudent(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static deleteStudent(req, res) {
    try {
      StudentService.deleteStudent(req.params.id);
      res.json({ message: 'Student deleted' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = StudentController;
