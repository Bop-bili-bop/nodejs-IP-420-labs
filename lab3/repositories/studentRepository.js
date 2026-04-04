// Example repository layer - handles data persistence
const { students } = require('../data/students');

class StudentRepository {
  static getAll() {
    return students;
  }

  static getById(id) {
    return students.find(student => student.id === parseInt(id));
  }

  static create(student) {
    const newStudent = {
      id: students.length + 1,
      ...student
    };
    students.push(newStudent);
    return newStudent;
  }

  static update(id, student) {
    const index = students.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
      students[index] = { ...students[index], ...student };
      return students[index];
    }
    return null;
  }

  static delete(id) {
    const index = students.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
      students.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = StudentRepository;
