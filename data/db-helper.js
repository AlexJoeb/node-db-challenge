
// * Knex Database (DBMS)
const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config[process.env.ENV]);

const getAllProjects = () => db('projects');
const getProjectByID = id => db('projects').where({id}).first();
const addProject = project => {
    return db('projects').insert(project)
        .then(resp => {
            return resp;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

const getAllResources = () => db('resources');
const getResourceByID = id => db('resources').where({id}).first();
const addResource = resource => {
    return db('resources').insert(resource)
        .then(resp => {
            return resp;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

const getAllTasks = () => {
    return db('tasks as t')
        .join('projects as p', 't.project_id', '=', 'p.id')
        .select('t.id as Task ID', 't.desc as Task Description', 't.notes as Notes', 't.completed as Completed', 'p.name as Project Name', 'p.desc as Project Description');
}

const getTaskByID = id => {
    return db('tasks as t')
        .where('t.id', '=', id)
        .first()
        .join('projects as p', 't.project_id', '=', 'p.id')
    .select('t.id as Task ID', 't.desc as Task Description', 't.notes as Notes', 't.completed as Completed', 'p.name as Project Name', 'p.desc as Project Description');
}

const addTask = task => {
    return db('tasks').insert(task)
        .then(resp => {
            return resp;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

module.exports = {
    getAllProjects,
    getProjectByID,
    addProject,

    getAllResources,
    getResourceByID,
    addResource,

    getAllTasks,
    getTaskByID,
    addTask
}