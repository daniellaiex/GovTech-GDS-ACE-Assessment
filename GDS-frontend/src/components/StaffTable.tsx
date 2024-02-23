import { Button, Table, Pagination, Modal } from "react-bootstrap";
import { Staff } from '../models/staff';
import stylesUtils from '../styles/utils.module.css';
import { useState } from "react";
import { Redeem } from "../models/redeem";
import * as GiftRedemption from "../network/gift_redemption_api";

interface StaffTableProps {
  staffData: Staff[];
  redeemData: Redeem[];
}

const StaffTable: React.FC<StaffTableProps> = ({ staffData, redeemData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [redeemModal, setRedeemModal] = useState(false);
  const [teamNameToRedeem, setTeamNameToRedeem] = useState<string | null>(null);

  const staffPerPage = 10;
  const pageRange = 2;

  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = staffData.slice(indexOfFirstStaff, indexOfLastStaff);

  const totalPages = Math.ceil(staffData.length / staffPerPage);

  const handleRedeem = async () => {
    if (teamNameToRedeem) {
      await GiftRedemption.updateRedeemStatus(teamNameToRedeem);
      const redeemToUpdate = redeemData.find(r => r.team_name === teamNameToRedeem);
      if (redeemToUpdate) {
        redeemToUpdate.redeemed = true;
        redeemToUpdate.updated_at = new Date().toISOString();
      }
      setRedeemModal(false);
    }
  };

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Staff Pass ID</th>
            <th>Team Name</th>
            <th>Date Of Redemption</th>
            <th>Redeem Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentStaff.map(staff => {
            const redeem = redeemData.find(r => r.team_name === staff.team_name);
            const isRedeemed = redeem && redeem.redeemed;
            const redeemedOn = redeem && redeem.updated_at;
            let date;
            if (redeemedOn) {
              date = new Date(redeemedOn).toLocaleString();
            } else {
              date = "Not redeemed yet";
            }

            return (
              <tr key={staff._id}>
                <td>{staff.staff_pass_id}</td>
                <td>{staff.team_name}</td>
                <td>{isRedeemed ? `Redeemed on ${date}` : "Not redeemed yet"}</td>
                <td>
                  {isRedeemed ? "Redeemed" : (
                    <Button className={`${stylesUtils.blockCenter}`} onClick={() => { setRedeemModal(true); setTeamNameToRedeem(staff.team_name); }}>
                      Redeem
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => changePage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(endPage - startPage + 1)].map((_, i) => (
          <Pagination.Item key={i} active={startPage + i === currentPage} onClick={() => changePage(startPage + i)}>
            {startPage + i}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => changePage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>

      <Modal show={redeemModal} onHide={() => setRedeemModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Redeem Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to redeem for team {teamNameToRedeem}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setRedeemModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRedeem}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StaffTable;