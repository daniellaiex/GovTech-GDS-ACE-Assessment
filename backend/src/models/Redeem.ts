import mongoose from 'mongoose';

interface Redeem {
  team_name: string,
  redeemed: boolean
  updated_at: Date | null
}

const redeemSchema = new mongoose.Schema<Redeem>({
  team_name: { type: String, required: true },
  redeemed: { type: Boolean, required: true },
  updated_at: { type: Date, default: null }
}, { collection: 'Redeem', versionKey: false });

const Redeem = mongoose.model<Redeem>('Redeem', redeemSchema);

export default Redeem;