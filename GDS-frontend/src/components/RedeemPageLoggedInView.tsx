import { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { Redeem } from '../models/redeem';
import { Staff } from '../models/staff';
import * as GiftRedemption from "../network/gift_redemption_api";
import StaffTable from './StaffTable';
import SearchBar from './SearchBar';

const RedeemPageLoggedInView = () => {
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [redeemData, setRedeemData] = useState<Redeem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showDataLoadingError, setShowDataLoadingError] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const handleSearch = async (staffPassId: string) => {
    try {
      const staff = await GiftRedemption.getStaffById(staffPassId);
      setSearchError(null);
      setStaffData(staff);
    } catch (error) {
      setSearchError((error as Error).message);
    }
  };

  useEffect(() => {
    async function loadStaff() {
      try {
        setShowDataLoadingError(false);
        setDataLoading(true);
        const staff = await GiftRedemption.fetchStaff();
        setStaffData(staff);
        const redeem = await GiftRedemption.fetchRedeem();
        setRedeemData(redeem);
      } catch (error) {
        console.error(error);
        setShowDataLoadingError(true);
      } finally {
        setDataLoading(false);
      }
    }
    loadStaff();
  }, []);
      
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      
      {dataLoading && <Spinner animation='border' variant='primary' />}

      {showDataLoadingError && <p>Something went wrong. Please refresh the page.</p>}
      {!dataLoading && !showDataLoadingError &&
        <>
          {
            !searchError && staffData.length > 0 ? <StaffTable staffData={staffData} redeemData={redeemData} /> : <p>You don't have any staff yet</p>
          }
        </>
      }
    </>
  )
}

export default RedeemPageLoggedInView;