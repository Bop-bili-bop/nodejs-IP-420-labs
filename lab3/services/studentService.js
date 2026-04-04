// Example service layer - business logic
const StudentRepository = require('../repositories/studentRepository');

class StudentService {
  static getAllStudents() {
    return StudentRepository.getAll();
  }

  static getStudentById(id) {
    const student = StudentRepository.getById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  static createStudent(studentData) {
    // Validation logic here
    if (!studentData.name || !studentData.email) {
      throw new Error('Name and email are required');
    }
    return StudentRepository.create(studentData);
  }

  static updateStudent(id, studentData) {
    return StudentRepository.update(id, studentData);
  }

  static deleteStudent(id) {
    return StudentRepository.delete(id);
  }
}

module.exports = StudentService;
