export const createSchema_201 = {
  success: true,
  message: 'user created successfully',
  data: {
    id: 'fed37ebe-1028-49ee-ab14-59e37e11d7d7',
    name: 'Jin Gustavo',
    email: 'jin@example.com',
    photo: 'https://img.odcdn.com.br/wp-content/uploads/2022/08/fotografo.jpg',
    phone: '11954614344',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-09-29T21:28:17.403Z',
    updatedAt: '2024-09-29T21:28:17.403Z',
    deletedAt: null,
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
  },
};

export const createSchema_400 = {
  success: false,
  message: 'email already registered',
  data: null,
};

export const findAllSchema_200 = {
  success: true,
  message: 'users found successfully',
  data: {
    total: 1,
    totalPages: 1,
    data: [
      {
        id: 'fed37ebe-1028-49ee-ab14-59e37e11d7d7',
        name: 'Jin Gustavo',
        email: 'jin@example.com',
        phone: '11954614344',
        photo: null,
        status: 'ACTIVE',
        role: 'USER',
        createdAt: '2024-09-29T21:28:17.403Z',
        updatedAt: '2024-09-29T21:28:17.403Z',
        deletedAt: null,
      },
    ],
  },
};

export const unauthorized_401 = {
  success: false,
  message: 'Unauthorized',
  data: null,
};

export const forbidden_403 = {
  message: 'Forbidden resource',
  error: 'Forbidden',
  statusCode: 403,
};

export const updatePhotoSchema_200 = {
  success: true,
  message: 'Photo updated successfully',
  data: {
    id: 'fed37ebe-1028-49ee-ab14-59e37e11d7d7',
    name: 'Jin Gustavo',
    email: 'jin@example.com',
    photo: 'https://img.odcdn.com.br/wp-content/uploads/2022/08/fotografo.jpg',
    phone: '11954614344',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-09-29T21:28:17.403Z',
    updatedAt: '2024-09-29T21:28:17.403Z',
    deletedAt: null,
  },
};

export const deleteSchema_200 = {
  success: true,
  message: 'user deleted successfully',
  data: null,
};

export const findByIdSchema_200 = {
  success: true,
  message: 'user found',
  data: {
    id: 'fed37ebe-1028-49ee-ab14-59e37e11d7d7',
    name: 'Jin Gustavo',
    email: 'jin@example.com',
    photo: 'https://img.odcdn.com.br/wp-content/uploads/2022/08/fotografo.jpg',
    phone: '11954614344',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-09-29T21:28:17.403Z',
    updatedAt: '2024-09-29T21:28:17.403Z',
    deletedAt: null,
  },
};

export const updateSchema_200 = {
  success: true,
  message: 'User updated successfully',
  data: {
    id: 'fed37ebe-1028-49ee-ab14-59e37e11d7d7',
    name: 'Jin Gustavo',
    email: 'jin@example.com',
    photo: 'https://img.odcdn.com.br/wp-content/uploads/2022/08/fotografo.jpg',
    phone: '11954614344',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-09-29T21:28:17.403Z',
    updatedAt: '2024-09-29T21:28:17.403Z',
    deletedAt: null,
  },
};
