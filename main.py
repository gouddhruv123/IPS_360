from flask import Flask, render_template
from firebase_config import db



app = Flask(__name__, template_folder='templates')
app.config['SECRET_KEY'] = 'Secret-key'

@app.route('/')
def landing_page():
    return render_template("landing_page.html")

@app.route('/Prof')
def teacher_page():
    return render_template("prof_page.html")

@app.route('/login/prof')
def teacher_login():
    return render_template("login_page_teacher.html")

@app.route('login/student')
def student_login():
    return render_template("login_page_student.html")

@app.route('login/student/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route('login/teacher/dashboard')
def dashboard():
    return render_template("teacher_dashboard.html")


if __name__ == "__main__":
    app.run(debug=True)