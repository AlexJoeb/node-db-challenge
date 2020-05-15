
// * Knex Database (DBMS)
const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config[process.env.ENV]);

const getAllProjects = () => {
    return db('projects');
}
const getProjectByID = id => {
    return db('projects as p').where({ id }).first()
        .select('p.id as ProjectID', 'p.name as Project Name', 'p.desc as Project Description', 'p.completed as Project Completed')
        .then(async resp => {
            // Resp will be a single project object.
            if (!resp) return resp;

            const tasks = await getTasksByProjectId(id);
            const resources = await getResourcesByProjectId(id);

            return {
                ...resp,
                tasks,
                resources,
            }
    })
}
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
const getResourceByID = id => db('resources').where({ id }).first();
const getResourcesByProjectId = id => {
    return db('projectresources as pr').where({ project_id: id })
        .join("resources as r", 'pr.resource_id', '=', 'r.id')
        .select('r.id as ResourceID', 'r.name as Resource Name', 'r.desc as Resource Description');
}
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
const getTasksByProjectId = id => {
    return db('tasks').where({ project_id: id })
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
    getResourcesByProjectId,
    addResource,

    getAllTasks,
    getTaskByID,
    getTasksByProjectId,
    addTask
}