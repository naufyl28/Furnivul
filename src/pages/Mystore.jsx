import React, { useEffect, useState } from "react";
import { Table, Select, Button, Modal, Label, TextInput } from "flowbite-react";

const Mystore = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllProductsModalOpen, setIsAllProductsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    _categoryId: "",
    product_description: "",
    _typeId: "",
    product_material: "",
    product_rate: 0,
    product_sold: 0,
    product_review: 0,
    product_price: 0,
    product_image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [passedStatuses, setPassedStatuses] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://65312ee04d4c2e3f333c9120.mockapi.io/Transcationdetails"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions from mock API");
        }

        const transactionsData = await response.json();

        const transactionsWithId = transactionsData.map(
          (transaction, index) => ({
            ...transaction,
            id: index.toString(),
            isStatusEditable: transaction.status !== "Delivered",
          })
        );

        setTransactions(transactionsWithId);
      } catch (error) {
        console.error("Error fetching transactions from mock API:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleStatusChange = async (index, selectedStatus) => {
    try {
      const transaction = transactions[index];

      if (
        !transaction.isStatusEditable ||
        passedStatuses.includes(selectedStatus)
      ) {
        console.log("Cannot change status for this transaction.");
        return;
      }

      const updatedTransactions = [...transactions];
      const currentStatusIndex = transactionStatusOrder.indexOf(
        transaction.status
      );
      const selectedStatusIndex =
        transactionStatusOrder.indexOf(selectedStatus);

      if (currentStatusIndex >= selectedStatusIndex) {
        console.log("Cannot move back to the previous status.");
        return;
      }

      updatedTransactions[index].status = selectedStatus;
      setTransactions(updatedTransactions);

      setPassedStatuses((prevStatuses) => [...prevStatuses, selectedStatus]);

      const transactionId = transactions[index].type;

      const response = await fetch(
        `https://65312ee04d4c2e3f333c9120.mockapi.io/Transcationdetails/${transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: selectedStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update status in mock API: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const transactionStatusOrder = [
    "Manifest",
    "On-Process",
    "On-Transit",
    "Received On Destination",
    "Delivered",
  ];

  const authenticateAdmin = async () => {
    try {
      const response = await fetch(
        "https://furnivul-web-app-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "admin@gmail.com",
            password: "admin123",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to authenticate admin: ${response.statusText}`);
      }

      const responseData = await response.json();

      console.log("Login Response Data:", responseData);

      if (!responseData.data || !responseData.data.token) {
        throw new Error("Token is missing in the response data.");
      }

      const adminToken = responseData.data.token;

      return adminToken;
    } catch (error) {
      console.error("Error authenticating admin:", error);
      throw error;
    }
  };

  const handleAddProduct = async () => {
    try {
      const adminToken = await authenticateAdmin();

      if (!adminToken) {
        console.error("Failed to get admin token.");
        return;
      }

      console.log("Data yang dikirim:", newProduct);

      const response = await fetch(
        "https://furnivul-web-app-production.up.railway.app/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          `Failed to add product: ${response.statusText}`,
          errorData
        );
        throw new Error(`Failed to add product: ${response.statusText}`);
      }

      setIsModalOpen(false);
      setEditingProduct(null);

      handleAllProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddFurniture = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAllProductsModalOpen(false);
    setEditingProduct(null);
  };

  const handleAllProducts = async () => {
    try {
      const response = await fetch(
        "https://furnivul-web-app-production.up.railway.app/products"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products from mock API");
      }

      const productsData = await response.json();

      const productsArray = productsData.data || productsData;

      setAllProducts(productsArray);
      setIsAllProductsModalOpen(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const adminToken = await authenticateAdmin();

      if (!adminToken) {
        console.error("Failed to get admin token.");
        return;
      }

      const response = await fetch(
        `https://furnivul-web-app-production.up.railway.app/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      handleAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveProduct = async () => {
    try {
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving or updating product:", error);
    }
  };

  const handleNewProductInputChange = (fieldName, value) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      _typeId: fieldName === "_typeId" ? value : prevProduct._typeId,
      [fieldName]: value,
    }));
  };

  return (
    <div className="overflow-x-auto m-28">
      <Table>
        <Table.Head>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Province</Table.HeadCell>
          <Table.HeadCell>Subdistrict</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Zipcode</Table.HeadCell>
          <Table.HeadCell>District</Table.HeadCell>
          <Table.HeadCell>Products</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell style={{ width: "190px" }}>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <Table.Row
                className={
                  transaction.status === "Delivered" ? "bg-green-200" : ""
                }
              >
                <Table.Cell>{transaction.name}</Table.Cell>
                <Table.Cell>{transaction.province}</Table.Cell>
                <Table.Cell>{transaction.subdistrict}</Table.Cell>
                <Table.Cell>{transaction.phone}</Table.Cell>
                <Table.Cell>{transaction.zipcode}</Table.Cell>
                <Table.Cell>{transaction.district}</Table.Cell>
                <Table.Cell>
                  {transaction.products.map((product, idx) => (
                    <div key={idx}>
                      {product.name} ({product.quantity} pcs)
                    </div>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  {transaction.totalPrice.toLocaleString("id-ID")}
                </Table.Cell>
                <Table.Cell>
                  {transaction.isStatusEditable ? (
                    <Select
                      value={transaction.status || ""}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                    >
                      <option value="Manifest">Manifest</option>
                      <option value="On-Process">On-Process</option>
                      <option value="On-Transit">On-Transit</option>
                      <option value="Received On Destination">
                        Received On Destination
                      </option>
                      <option value="Delivered">Delivered</option>
                    </Select>
                  ) : (
                    transaction.status
                  )}
                </Table.Cell>
              </Table.Row>
              {}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>

      <div className="mt-9">
        <Button onClick={handleAddFurniture}>Add New Product</Button>
      </div>

      <div className="mt-4">
        <Button onClick={handleAllProducts}>All Product</Button>
      </div>

      <Modal dismissible show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Add New Product</Modal.Header>
        <Modal.Body>
          <div className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productName" value="Product Name" />
              </div>
              <TextInput
                id="productName"
                type="text"
                sizing="md"
                value={newProduct.product_name}
                onChange={(e) =>
                  handleNewProductInputChange("product_name", e.target.value)
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productCategory" value="Category Product" />
              </div>
              <Select
                id="productCategory"
                sizing="md"
                value={newProduct._categoryId}
                onChange={(e) =>
                  handleNewProductInputChange("_categoryId", e.target.value)
                }
              >
                <option value="6553b0d780fad5b839ade6e0">Living Room</option>
                <option value="6553eeb0d3596984234008c1">Bed Room</option>
                <option value="655a2f4f7b4f6c96f968e714">Workspace</option>
                <option value="655a2f5d7b4f6c96f968e716">Kitchen</option>
                <option value="655a2f6d7b4f6c96f968e718">Dining Room</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="product_description"
                  value="Product Description"
                />
              </div>
              <TextInput
                id="product_description"
                type="text"
                sizing="md"
                value={newProduct.product_description}
                onChange={(e) =>
                  handleNewProductInputChange(
                    "product_description",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productType" value="Product Type" />
              </div>
              <Select
                id="productType"
                sizing="md"
                value={newProduct._typeId}
                onChange={(e) =>
                  handleNewProductInputChange("_typeId", e.target.value)
                }
              >
                <option value="6553b83f7ca0f30a1a2a7447">Sofa</option>
                <option value="6553efacd3596984234008d3">Single Bed</option>
                <option value="655a2ff67b4f6c96f968e723">Kursi Kantor</option>
                <option value="655a30007b4f6c96f968e725">Meja Kantor</option>
                <option value="655a30157b4f6c96f968e727">Kabinet dapur</option>
                <option value="655a303d7b4f6c96f968e729">Meja Makan</option>
                <option value="655a304b7b4f6c96f968e72b">kursi Makan</option>
                <option value="655a30cf7b4f6c96f968e72d">Bed Queen</option>
                <option value="655a30d67b4f6c96f968e72f">Bed king</option>
                <option value="655a30e57b4f6c96f968e731">Meja tamu</option>
                {}
              </Select>
            </div>
            <div>
              {}
              {}
              <div className="mb-2 block">
                <Label htmlFor="product_material" value="Product Material" />
              </div>
              <TextInput
                id="product_material"
                type="text"
                sizing="md"
                value={newProduct.product_material}
                onChange={(e) =>
                  handleNewProductInputChange(
                    "product_material",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productPrice" value="Product Price" />
              </div>
              <TextInput
                id="productPrice"
                type="number"
                sizing="md"
                value={newProduct.product_price}
                onChange={(e) =>
                  handleNewProductInputChange(
                    "product_price",
                    parseFloat(e.target.value)
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="product_image" value="Product Image URL" />
              </div>
              <TextInput
                id="product_image"
                type="text"
                sizing="md"
                value={newProduct.product_image}
                onChange={(e) =>
                  handleNewProductInputChange("product_image", e.target.value)
                }
              />
            </div>
            {}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        dismissible
        show={isAllProductsModalOpen}
        onClose={handleCloseModal}
      >
        <Modal.Header>All Products</Modal.Header>
        <Modal.Body>
          {Array.isArray(allProducts) && allProducts.length > 0 ? (
            allProducts.map((product) => (
              <div key={product._id} className="border p-4 mb-4">
                <div className="mb-2 font-bold">{product.product_name}</div>
                <div>
                  <div>Category: {product._categoryId.category}</div>
                  <div>Description: {product._categoryId.description}</div>
                </div>
                <div>
                  <div className="mt-2"></div>
                  <div className="mt-2"></div>
                  <div className="mt-2">Price: {product.product_price}</div>
                </div>
                <div className="mt-2">
                  {product.product_image && (
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="w-32 h-32 object-cover"
                    />
                  )}
                </div>
                <div className="flex justify-end mt-2">
                  <Button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div>No products available</div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Mystore;
