import mongoose from 'mongoose';
import { Users } from './users.mjs';

const Schema = mongoose.Schema;
const BillsSchema = new Schema({
    name: Schema.Types.String,
    amount: Schema.Types.Number,
    dueDate: Schema.Types.Date,
    isNecessity: Schema.Types.Boolean,
    paidUsers: [{ type: Schema.Types.ObjectId, ref: Users }],
    unpaidUsers: [{ type: Schema.Types.ObjectId, ref: Users }]
});

export const Bills = mongoose.model('bills', BillsSchema);