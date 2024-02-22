import csvParser from 'csv-parser';
import fs from 'fs';
import Staff from '../src/models/Staff';


const csvFilePath = './dbinitscripts/data/staff-id-to-team-mapping-long.csv';

async function populateDatabase() {

    const isDatabaseEmpty = await Staff.countDocuments() === 0;

    if (isDatabaseEmpty) {
      fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        const staff = new Staff({
          staff_pass_id: row.staff_pass_id,
          team_name: row.team_name,
          created_at: row.created_at,
        });

        try {
          staff.save();
        } catch (error) {
          console.error('Error saving staff to MongoDB:', error);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        console.log("Database Team Collection Populating...");
      });
    }
  } 

export default populateDatabase;