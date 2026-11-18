let courses = [];

const courseForm = document.getElementById("courseForm");
const courseTable = document.getElementById("courseTable");

let editIndex = -1;

courseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("courseId").value;
    const name = document.getElementById("courseName").value;
    const code = document.getElementById("courseCode").value;
    const department = document.getElementById("department").value;

    // Check duplicate ID
    const existingCourse = courses.find(
        (course, index) => course.id === id && index !== editIndex
    );

    if (existingCourse) {
        alert("Course ID already exists!");
        return;
    }

    // CREATE / UPDATE
    const course = {
        id: id,
        name: name,
        code: code,
        department: department
    };

    if (editIndex === -1) {
        // CREATE
        courses.push(course);
        alert("Course added successfully!");
    } else {
        // UPDATE
        courses[editIndex] = course;
        editIndex = -1;
        document.getElementById("submitBtn").textContent = "Add Course";
        alert("Course updated successfully!");
    }

    displayCourses();
    courseForm.reset();
});

// READ
function displayCourses() {
    courseTable.innerHTML = "";

    courses.forEach(function(course, index) {
        courseTable.innerHTML += `
            <tr>
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.code}</td>
                <td>${course.department}</td>
                <td>
                    <button class="edit-btn" onclick="editCourse(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteCourse(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// UPDATE
function editCourse(index) {
    const course = courses[index];

    document.getElementById("courseId").value = course.id;
    document.getElementById("courseName").value = course.name;
    document.getElementById("courseCode").value = course.code;
    document.getElementById("department").value = course.department;

    editIndex = index;

    document.getElementById("submitBtn").textContent = "Update Course";
}

// DELETE
function deleteCourse(index) {
    if (confirm("Are you sure you want to delete this course?")) {
        courses.splice(index, 1);

        // Reset edit mode if the edited course is deleted
        if (editIndex === index) {
            editIndex = -1;
            courseForm.reset();
            document.getElementById("submitBtn").textContent = "Add Course";
        }

        displayCourses();
    }
}