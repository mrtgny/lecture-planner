import React, { Component } from "react";
import ReactDOM from "react-dom";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class App extends Component {
  constructor(props) {
    super(props);
    let days = window.localStorage.getItem("days");
    let courses = window.localStorage.getItem("courses");

    if (courses === null && days === null) {
      const dummyCourses = `[{"id":1662068190642,"code":"CENG201","bgColor":"#FBECC2","color":"black"},{"id":1662068281235,"code":"CHEM202","bgColor":"#D27623","color":"black"},{"code":"TEST101","name":"","bgColor":"#11636C","id":1662068348769,"color":"white"}]`
      window.localStorage.setItem("courses", dummyCourses)
      const dummyDays = `[[null,null,null,null,null,null],[null,1662068190642,null,null,null,1662068190642],[null,1662068281235,null,null,null,null],[null,1662068348769,1662068190642,null,1662068348769,null],[null,null,null,1661946869725,1662068190642,1662068281235],[null,null,1662068281235,1662068190642,1662068281235,null],[null,null,null,1662068281235,null,null],[null,null,1662068348769,1662068190642,null,1662068348769],[null,null,null,null,null,null],[null,null,null,null,null,null]]`
      window.localStorage.setItem("days", dummyDays)
      courses = window.localStorage.getItem("courses");
      days = window.localStorage.getItem("days");
    }


    console.log(days);
    this.state = {
      courses: courses ? JSON.parse(courses) : [],
      days: days
        ? JSON.parse(days)
        : Array(10)
          .fill()
          .map(i => Array(6).fill())
    };

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onCoursesChange = this.onCoursesChange.bind(this);
    this.onProgramChange = this.onProgramChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onRemoveCourse = this.onRemoveCourse.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  openDialog(id) {
    const editIndex = this.state.courses.map(i => i.id).indexOf(id);
    const editCourse = { ...this.state.courses[editIndex] };
    this.setState({
      editCourse,
      editIndex,
      isDialogOpen: true
    });
  }

  onDialogClose() {
    this.setState({
      editCourse: undefined,
      editIndex: -1,
      isDialogOpen: false
    });
  }

  onEdit(newCourse) {
    const newCourses = [...this.state.courses];
    newCourses[this.state.editIndex] = newCourse;
    this.onCoursesChange(newCourses);
    this.onDialogClose();
  }

  onDragStart(draggingItem) {
    this.setState({ draggingItem: draggingItem.id });
  }

  onDragEnd() {
    this.setState({ draggingItem: undefined });
  }

  onProgramChange(days) {
    window.localStorage.setItem("days", JSON.stringify(days));
    this.setState({ days });
  }

  onCoursesChange(courses) {
    window.localStorage.setItem("courses", JSON.stringify(courses));
    this.setState({ courses });
  }

  onRemoveCourse(id) {
    const editIndex = this.state.courses.map(i => i.id).indexOf(id);
    const newCourses = [...this.state.courses];
    newCourses[editIndex] = undefined;
    this.onCoursesChange(newCourses.filter(i => i));
  }

  render() {
    return (
      <div>
        <EditDialog
          open={this.state.isDialogOpen}
          course={this.state.editCourse}
          onClose={this.onDialogClose}
          onEdit={this.onEdit}
        />
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: 200,
              padding: 8,
              backgroundColor: "#eee"
            }}
          >
            <div style={{ minHeight: "calc(100vh - 32px)" }}>
              <Courses
                courses={this.state.courses}
                onCoursesChange={this.onCoursesChange}
                openDialog={this.openDialog}
                onRemoveCourse={this.onRemoveCourse}
                onCourseAdd={e =>
                  this.onCoursesChange([...this.state.courses, e])
                }
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
              />
            </div>
          </div>
          <div style={{ width: "100%", padding: 8, margin: 8, overflow: 'auto' }}>
            <div style={{ minHeight: "calc(100vh - 32px)" }}>
              <Schedule
                days={this.state.days}
                courses={this.state.courses}
                openDialog={this.openDialog}
                draggingItem={this.state.draggingItem}
                onCoursesChange={this.onProgramChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      editCourse: undefined,
      isDialogOpen: false,
      editIndex: -1
    };
    this.onCourseAdd = this.onCourseAdd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragStart(e) {
    const { onDragStart } = this.props;
    onDragStart(e);
  }

  onDragEnd(e) {
    const { onDragEnd } = this.props;
    onDragEnd(e);
  }

  onCourseAdd() {
    const { onCourseAdd } = this.props;
    onCourseAdd({
      id: new Date().getTime(),
      code: this.state.courseName,
      bgColor: getRandomColor(),
      color: "black"
    });
    this.setState({ courseName: "" });
  }

  render() {
    const { courses, openDialog, onRemoveCourse } = this.props;
    return (
      <div>
        {courses.map((course, index) => {
          return (
            <Course
              onDragStart={() => this.onDragStart(course)}
              key={index}
              course={course}
              showDsc
              onClear={() => onRemoveCourse(course.id)}
              onClick={() => openDialog(course.id)}
              onDragEnd={() => this.onDragEnd(course)}
            />
          );
        })}
        <div style={{
          width: '100%',
        }}>
          <input
            type="text"
            style={{
              padding: 8,
              width: 'fit-content',
            }}
            placeholder="Course Code"
            value={this.state.courseName}
            onChange={e => this.setState({ courseName: e.target.value })}
          />
        </div>
        <button
          disabled={!this.state.courseName}
          style={{
            padding: 8,
            border: 'none',
            cursor: 'pointer',
            transition: '0.4s',
            backgroundColor: !this.state.courseName ? "gray" : 'skyblue',
            width: '100%',
            marginTop: 8,
            color: 'white'
          }} onClick={this.onCourseAdd}>Ekle</button>
      </div>
    );
  }
}

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        code: "",
        name: "",
        bgColor: ""
      }
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.course !== nextProps.course) {
      this.setState({ course: { ...this.state.course, ...nextProps.course } });
    }
  }

  handleOnChange(field, value) {
    const newCourse = { ...this.state.course };
    newCourse[field] = value;
    this.setState({ course: newCourse });
  }

  onSave() {
    const { onEdit } = this.props;
    onEdit(this.state.course);
  }

  render() {
    const { open, onClose } = this.props;
    if (!open) return null;
    const dialog = (
      <div>
        <div className="dialog-bg" onClick={onClose} />
        <div className="dialog">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              padding: 16
            }}
          >
            <div>
              <p>Ders Kodu</p>
              <input
                type="text"
                value={this.state.course.code}
                style={{ width: "calc(100% - 16px)", padding: 8 }}
                onChange={e => this.handleOnChange("code", e.target.value)}
              />
            </div>
            <div>
              <p>Ders Adı</p>
              <input
                type="text"
                value={this.state.course.name}
                style={{ width: "calc(100% - 16px)", padding: 8 }}
                onChange={e => this.handleOnChange("name", e.target.value)}
              />
            </div>
            <div>
              <p>Arkaplan Rengi</p>
              <input
                type="color"
                value={this.state.course.bgColor}
                style={{ width: "calc(100% - 16px)", padding: 8 }}
                onChange={e => this.handleOnChange("bgColor", e.target.value)}
              />
            </div>
            <p>Yazı Rengi</p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <button
                style={{
                  padding: 8,
                  margin: 8,
                  width: "100%",
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: "black"
                }}
                onClick={e => this.handleOnChange("color", "black")}
              />
              <button
                style={{
                  padding: 8,
                  margin: 8,
                  width: "100%",
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: "white"
                }}
                onClick={e => this.handleOnChange("color", "white")}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <button style={{ padding: 8, margin: 8 }} onClick={onClose}>
                Vazgeç
              </button>
              <button style={{ padding: 8, margin: 8 }} onClick={this.onSave}>
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(dialog, document.getElementById("root"));
  }
}

const Course = props => {
  const { course, onDragStart, onDragEnd, onClick, onClear, showDsc } = props;
  if (!course) return null;
  return (
    <div
      className="course"
      draggable={!!(onDragStart || onDragEnd)}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        backgroundColor: course.bgColor,
        color: course.color,
        position: "relative"
      }}
    >
      <div
        onClick={onClick}
        style={{ width: "100%", height: "100%", paddingRight: 20, paddingLeft: 16 }}
        className="center"
      >
        <div>
          <div style={{ wordBreak: "break-all" }}>{course.code}</div>
          {showDsc ? <div style={{ fontWeight: "normal", fontSize: 12, margin: 4 }}>{course.name}</div> : null}
        </div>
      </div>
      <div
        onClick={onClear}
        style={{
          position: "absolute",
          right: 4,
          top: 0,
          zIndex: 1,
          padding: 2
        }}
      >
        x
      </div>
    </div>
  );
};

class Schedule extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.startTime = new Date().setHours(8, 30, 0, 0);
    this.breakTime = new Date().setHours(0, 10, 0, 0);
    this.lectureTime = new Date().setHours(0, 50, 0, 0);
    this.times = [];
    const { days } = props;
    days.forEach(i => this.getTime());
    this.onDrop = this.onDrop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  removeCourse(dindex, cindex) {
    const { days, onCoursesChange } = this.props;
    const newDays = [...days];
    newDays[dindex][cindex] = undefined;
    onCoursesChange(newDays);
  }

  onDrop(dindex, cindex) {
    const { days, onCoursesChange, draggingItem } = this.props;
    const newDays = [...days];
    newDays[dindex][cindex] = draggingItem;
    onCoursesChange(newDays);
  }

  getTime() {
    const startTime = new Date(this.startTime);
    const endTime = new Date(
      new Date().setHours(
        new Date(this.startTime).getHours() +
        new Date(this.lectureTime).getHours(),
        new Date(this.startTime).getMinutes() +
        new Date(this.lectureTime).getMinutes()
      )
    );
    this.startTime = new Date().setHours(
      new Date(this.startTime).getHours() +
      new Date(this.lectureTime).getHours() +
      new Date(this.breakTime).getHours(),
      new Date(this.startTime).getMinutes() +
      new Date(this.lectureTime).getMinutes() +
      new Date(this.breakTime).getMinutes()
    );

    const startTimeString =
      startTime.getHours().toString() +
      "." +
      (startTime.getMinutes().toString() === "0"
        ? "00"
        : startTime.getMinutes().toString());
    const endTimeString =
      endTime.getHours().toString() +
      "." +
      (endTime.getMinutes().toString() === "0"
        ? "00"
        : endTime.getMinutes().toString());

    this.times.push(startTimeString + " - " + endTimeString);
  }

  render() {
    const { days, courses, openDialog } = this.props;
    console.log("days", days);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: "repeat(6, minmax(200px, 1fr))" }} >
        {
          days.map((day, dindex) => {
            return (
              <div style={{
                display: 'grid', gridTemplateColumns: "repeat(6, minmax(200px, 1fr))",
                gridColumn: "span 6 / span 6",
              }} key={dindex}>
                {day.map((course, cindex) => {
                  return (
                    <div
                      key={cindex}
                      style={{
                        border: "1px solid #ccc",
                        minWidth: 200,
                        minHeight: 100
                      }}
                      className="center"
                      onDragOver={this.allowDrop}
                      onDrop={() => this.onDrop(dindex, cindex)}
                    >
                      {!dindex && cindex ? (
                        weekDays[cindex - 1]
                      ) : !cindex && dindex ? (
                        this.times[dindex - 1]
                      ) : course ? (
                        <Course
                          course={(courses.filter(i => i.id === course) || [])[0]}
                          onClick={() => openDialog(course)}
                          onClear={() => this.removeCourse(dindex, cindex)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        }
      </div>
    )
  }
}

export default App;
