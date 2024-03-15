import { Router } from "express";
import { Notes } from "../mongoose/schema/notes.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createNoteSchema } from "../utils/validationSchemas.mjs";

const router = Router();

router.get("/", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  Notes.find().then((data) => {
    res.status(200).send(data);
  });
});

router.post("/", checkSchema(createNoteSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  if (!req.user) return res.sendStatus(401);

  const data = matchedData(req);
  data.author = req.user.id;
  let newNote = new Notes(data);

  try {
    const savedNote = await newNote.save();
    return res.status(200).send(savedNote);
  } catch (err) {
    return res.sendStatus(400);
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401);

  const note = await Notes.findById(req.params.id);
  if (!note) return res.status(400).send("Record not found");
  if (note.author.toString() !== req.user.id)
    return res.status(403).send("You are not allowed to delete this note.");

  try {
    const deletedNote = await Notes.deleteOne({ _id: req.params.id });
    res.status(200).send(deletedNote);
  } catch (err) {
    return res.sendStatus(400);
  }
});

router.patch("/:id", checkSchema(createNoteSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  if (!req.user) return res.sendStatus(401);

  const note = await Notes.findById(req.params.id);
  if (!note) return res.status(400).send("Record not found");
  if (note.author.toString() !== req.user.id)
    return res.status(403).send("You are not allowed to edit this note.");

  const data = matchedData(req);


  try {
    const patchedNote = await Notes.findByIdAndUpdate(req.params.id, data, {new: true});
    return res.status(200).send(patchedNote);
  } catch (err) {
    return res.sendStatus(400);
  }
});

export default router;
