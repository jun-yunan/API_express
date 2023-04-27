const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'NodeJs'},
    {id: 2, name: 'PHP'},
    {id: 3, name: 'ReactJs'},
]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// get all
app.get('/api/courses', (req, res) => {
    res.send(courses)
})


// get by id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id))
    if (!course) res.status(404).send('ID không tồn tại')
    res.send(course)
})

// post
app.post('/api/courses/add', (req, res) => {
    const course = {
        id: req.body.id,
        name: req.body.name,
    }
    courses.push(course)
    res.send(JSON.stringify({
        success: true,
        notice: "Bạn đã thêm thành công",
        data : courses
    }))
})

// put
app.put('/api/courses/edit/:id', (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id))
    course.name = req.body.name
    res.send(JSON.stringify({
        success: true,
        notice: "Bạn đã cập nhật thành công",
        data : courses
    }))
})


// delete
app.delete('/api/courses/delete/:id', (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id))
    let index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(JSON.stringify({
        success: true,
        notice: "Bạn đã xoá thành công",
        data : courses
    }))
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})