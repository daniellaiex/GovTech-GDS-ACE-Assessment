import Staff from '../src/models/Staff';
import Redeem from '../src/models/Redeem';

async function aggregateData() {

  const isDatabaseEmpty = await Redeem.countDocuments() === 0;

  if (isDatabaseEmpty) {
    if (await Staff.countDocuments() === 0) {
      console.error('Error: Staff collection is empty');
      return;
    } else {
      console.log("Database Team Populated");
      console.log("Database Redeem Collection Populating...")

      // Read Team collection and aggregate team names
      const teamNames = await Staff.aggregate([
        { $group: { _id: '$team_name' } },
      ]).exec();

      if (teamNames.length === 0) {
        console.error('Error: No team names found for aggregation');
        return;
      } else {

        const teamName = teamNames.map(team => team._id);

        // Create Redeem collection
        teamName.forEach((name) => {
          const redeem = new Redeem({
            team_name: name,
            redeemed: false,
          });
          try {
            redeem.save();
          } catch (error) {
            console.error('Error saving redeem to MongoDB:', error);
          }
        });
        console.log("Database Redeem Collection Populated");
      }
    }
  }
}

export default aggregateData;