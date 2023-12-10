import { Breadcrumb, Button, Card, Modal } from "flowbite-react";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Payment() {
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [showUnderMaintenanceModal, setShowUnderMaintenanceModal] =
    useState(false); // Memperbaiki nama variabel
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Retrieve data from local storage
    const storedTotalPrice = localStorage.getItem("totalPrice");
    if (storedTotalPrice) {
      setTotalPrice(parseInt(storedTotalPrice, 10));
    }
  }, []);

  const handleClickPayment = () => {
    setShowQrisModal(false);
    Swal.fire({
      title: "Payment Status",
      text: "Payment was successful",
      icon: "success",
      confirmButtonText: "Back to Home",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href =
          "/cart/address/add-address/checkout/payment/transaction-status";
      }
    });
  };

  const openQrisModal = () => {
    setShowQrisModal(true);
  };

  const closeQrisModal = () => {
    setShowQrisModal(false);
  };

  const openUnderMaintenanceModal = () => {
    setShowUnderMaintenanceModal(true);
  };

  const closeUnderMaintenanceModal = () => {
    setShowUnderMaintenanceModal(false);
  };

  return (
    <div className="mx-7">
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 py-3 dark:bg-gray-800"
      >
        {/* Breadcrumb items */}
      </Breadcrumb>

      <h1 className="flex items-center justify-center text-3xl font-bold">
        Payment
      </h1>
      <div className="flex items-center justify-center">
        <div className="w-auto">
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mt-4 h-auto w-auto">
            <Button
              className="w-full bg-white border-2 border-slate-10   hover:bg-sky-700 hover:border-blue-900 hover:text-white"
              onClick={openQrisModal}
            >
              <div className="flex items-center justify-center px-8">
                <img
                  src="https://xendit.co/wp-content/uploads/2020/03/iconQris.png"
                  alt="Qrisbutton"
                  width={120}
                />
              </div>
            </Button>

            <Button
              className="w-full bg-white border-2 border-slate-10   hover:bg-sky-700 hover:border-blue-900 hover:text-white py-1"
              onClick={openUnderMaintenanceModal}
            >
              <div className="flex items-center justify-center  ">
                <img
                  src="https://image.cermati.com/v1585904886/o81yliwckjhywelnx13a.png"
                  alt="gambar2"
                  width={120}
                />
              </div>
            </Button>

            <Button
              className="w-full bg-white border-2 border-slate-10   hover:bg-sky-700 hover:border-blue-900 hover:text-white"
              onClick={openUnderMaintenanceModal}
            >
              <div className="flex items-center justify-center px-8">
                <img
                  src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg"
                  alt="gambar3"
                  width={120}
                  className=""
                />
              </div>
            </Button>

            <Button
              className="w-full bg-white border-2 border-slate-10   hover:bg-sky-700 hover:border-blue-900 hover:text-white"
              onClick={openUnderMaintenanceModal}
            >
              <div className="flex items-center justify-center px-8">
                <img
                  src="https://e7.pngegg.com/pngimages/1013/540/png-clipart-mastercard-mastercard.png"
                  alt="gambar4"
                  width={120}
                />
              </div>
            </Button>
          </Card>
        </div>
      </div>

      {/* Modal for Qris */}
      <Modal
        show={showQrisModal}
        onClose={closeQrisModal}
        className="modal-container"
      >
        <Modal.Header className="">Scan QRIS</Modal.Header>
        <Modal.Body className="modal-content">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl mt-4">
              Total Price:{" "}
              {totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p className="mt-3 mb-3">Scan QRIS for payment</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img
              src="https://tabungwakafumat.org/wp-content/uploads/2021/07/QR-Code.jpg"
              alt="qris"
              width={300}
              height={350}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-center">
          <Button onClick={handleClickPayment}>Transaction Status</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Under Maintenance */}
      <Modal
        show={showUnderMaintenanceModal}
        onClose={closeUnderMaintenanceModal}
        className="modal-container"
      >
        <Modal.Header className="">Under Maintenance</Modal.Header>
        <Modal.Body className="modal-content">
          <p>Sorry, this payment is currently under maintenance.</p>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-center">
          <Button onClick={closeUnderMaintenanceModal}>Accept</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Payment;
