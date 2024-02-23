import mongoose from 'mongoose';

interface Staff {
  staff_pass_id: string,
  team_name: string,
  created_at: bigint,
}

const teamSchema = new mongoose.Schema<Staff>({
  staff_pass_id: { type: String, required: true },
  team_name: { type: String, required: true },
  created_at: { type: Number, required: true },
}, { collection: 'Staff', versionKey: false });

const Staff = mongoose.model<Staff>('Staff', teamSchema);

export default Staff;