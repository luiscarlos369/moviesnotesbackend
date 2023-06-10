const knex = require("../database/knex");

class NotesController {

async create(request, response){

const { title, description, rating, streaming_services, tags } = request.body;
const user_id = request.user.id;

const [note_id]   = await knex("movieNotes").insert({
title,
description,
rating,
streaming_services,
user_id
});


const tagsInsert= tags.map(name => {
return {
note_id,
name,
user_id,
}
});

await knex("tags").insert(tagsInsert);

return response.json();

}

async show (request, response){

const { id } = request.params;
const note = await knex("movieNotes").where({ id }).first();
const tags = await knex("tags").where({note_id: id}).orderBy("name");

return response.json({
...note,
tags,
});
}


async delete(request, response){
const { id } = request.params;

await knex("movieNotes").where({id}).delete();

return response.json();

}

async index(request, response){
const { title, tags} = request.query;
const user_id = request.user.id;


let notes;

if (tags) {
const filterTags = tags.split(",").map(tag => tag.trim());

notes = await knex("tags")
.select([
"movieNotes.id",
"movieNotes.title",
"movieNotes.user_id",
])
.where("notes.user_id", user_id)
.whereLike("movieNotes.title", `%${title}%`)
.whereIn("name", filterTags)
.innerJoin("movieNotes", "movieNotes.id", "tags.note_id")
.groupBy("movieNotes.id")
.orderBy("movieNotes.title")
}  
else {
notes = await knex("movieNotes")
.where({ user_id })
.whereLike("title", `%${title}%`)
.orderBy("title");
}

const userTags = await knex("tags").where({user_id});
const notesWithTags = notes.map(note => {
const noteTags = userTags.filter(tag => tag.note_id === note.id);
return {
...note,
tags: noteTags
}

});



return response.json(notesWithTags);
}

}

module.exports = NotesController;