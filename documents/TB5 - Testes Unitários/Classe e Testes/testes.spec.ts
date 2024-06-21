import { Request } from "express";
import { createProduct, deleteProduct, getProductById, updateProduct } from "../src/controllers/products";

describe('Product', () => {
  let productId : any;

  it('should be able to create a product', async () => {
    
    const body = {
      name: "Teclado RGB",
      description: "Teclado para gamers",
      price : "750",
      stockQuantity: "3",
      category: "Teclados",
    }

    const mockReq = { body } as Request;

    const mockRes: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    const mockNext = jest.fn();

    await createProduct(mockReq, mockRes, mockNext)

    const jsonCall = mockRes.json.mock.calls[0];
    productId = jsonCall[0].id

    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ name: body.name, description: body.description }));
  });

  it('should be able to update a product', async () => {
   
    const body =  {
      name: "Teclado RGB",
      description: "Teclado para quem quer mais fps",
      stockQuantity: "8",
      price : "750",
      category: "Teclados",
    }

    const mockReq : any = { 
      body,
      params: {
        id: productId
      }
    }

    const mockRes: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), 
    };

    const mockNext = jest.fn();

    await updateProduct(mockReq, mockRes, mockNext);

    const jsonCall = mockRes.json.mock.calls[0];
    productId = jsonCall[0].id
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ description: body.description, stockQuantity: Number(body.stockQuantity) }));
  });


  it('Should be able to find an product', async () => {
  
    const mockReq: any = { 
      params:{
        id: productId
      }
    };

    const mockRes: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), 
    };

    await getProductById(mockReq, mockRes)
    
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ id: productId }));
  });

  it('Should not be able to find an product', async () => {
  
    const mockReq: any = { 
      params:{
        id: "produtoqueelenuncavaiachar"
      }
    };

    const mockRes: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), 
    };

    await getProductById(mockReq, mockRes)
    
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Product not found" }));
  });

  it('Should be able to delete an product', async () => {
  
    const mockReq : any= { 
      params:{
        id: productId
      }
    };

    const mockRes: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), 
    };
    const mockNext = jest.fn();
    await deleteProduct(mockReq, mockRes, mockNext)
    
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ id: productId }));
  });


});

// describe('Testes users', () => {
//   it('deve criar um novo usuario com sucesso', async () => {
//      const userCreated = await createUser({
//       email: "",
//       fullName:""
//     })
  
//     expect(userCreated).toBeTruthy()
//   });
// });