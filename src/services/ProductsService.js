import BaseService from './BaseService.js';

class ProductsService extends BaseService {
    getAllProducts() {
        return this.get('products/GetProducts');
    }

    getProductsByPage(key) {
            return this.post('products/GetProducts',{CategoryId:key!=null?key.key:0,
            Name:key!=null?key.searchitem:"",
            Order:key!=null?key.Character:"",
            pageindex:key!=null?key.pageNumber:0,
            rowcount:10
        });
    }

    searchPatient(searchParams) {
        return this.post('providers/SearchPatients', { FirstName: searchParams });
    }

    addNewPatient(patient) {
        return this.post('providers/AddNewPatient',
            {
                FirstName: patient.firstName,
                LastName: patient.lastName,
                Phone: patient.phoneNumber,
                Email: patient.email
            });
    }

    addToCart(requestData) {
        return this.post('products/addtoCart', requestData);
    }

    getPatientsBasket() {
        return this.get('products/GetPatientBasket');
    }

    getDashboardData() {
        return this.get('ProviderDashboard/GetDashboardData/1');
    }

    getDashboardDataForProduct() {
        return this.get('ProviderDashboard/GetDashboardData/2');
    }

    sendPlaceOrder(requestData) {
        return this.post('Patient/PlaceOrders', requestData);
    }
     
    OrderPayment(payData)
    {
        return this.post('Orders/OrderPayment',payData);
    }
    getPatientAddressList()
    {
        return this.get('Patient/getPatientAddressList');
    }
    getPatientAddressDetailsByAddressID(AddressID)
    {
        return this.get('Patient/getPatientAddressDetailsByAddressID/'+AddressID);
    }
    CreateNewPatientAddress(AddressData)
    {
        return this.post('Patient/AddPatientAddressData',AddressData);
    }
     CreateNewProviderAddress(AddressData)
    {
        return this.post('providers/AddProviderAddressData',AddressData);
    }
    getProviderAddressList()
    {
        return this.get('providers/getProviderAddressList');
    }
    getProviderAddressDetailsByAddressID(AddressID)
    {
        return this.get('providers/getProviderAddressDetailsByAddressID/'+AddressID);
    }
    getAllCategoriespage(key)
    {
         return this.post('products/GetProducts',{CategoryId:key.key,
            Name:"",
            Order:key!=null?key.Character:"",
            pageindex:key.pageNumber,
            rowcount:10
        });
    }
    getAllCategories()
    {
        return this.get('products/GetProductCategory');
    }
    getSingleProductDetails(productID)
    {
        return this.get('products/getSingleProductDetails/'+productID)
    }
    getProductVariantdetails(productID)
    {
         return this.get('products/GetProductVariantByProductID/'+productID)
    }
    getProductsByAlphebets(key)
    {
         return this.post('products/GetProducts',{CategoryId:key.key,
            Name:"",
            Order:key!=null?key.Character:"",
            pageindex:key.pageNumber,
            rowcount:10
        });
    }
    UpdateProviderShippingAddress(data)
    {
         return this.put('providers/UpdateProviderAddressByAddressID', data);
    }
    UpdatePatientShippingAddress(data)
    {
         return this.put('Patient/UpdatePatientAddressByAddressID', data);
    }
}

export default new ProductsService();
