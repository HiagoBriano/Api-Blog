export const createSchema_201 = {
  success: true,
  message: 'post created successfully',
  data: {
    id: 'ff1e2256-63fb-4425-89ab-fd6836f3906e',
    title: 'Como centralizar uma div',
    subtitle: 'Aprenda de uma vez por todos como centralizar uma div',
    slug: 'como-centralizar-uma-div',
    content: 'Conteudo da publicação',
    authorId: '344d671d-98d4-4c03-aa1e-0dd59827d303',
    photo: null,
    photoDescription: 'é a imagem do VS Code com um código em HTML',
    language: 'ptBR',
    exclusive: false,
    published: false,
    publishedAt: null,
    createdAt: '2024-10-10T17:30:39.765Z',
    updatedAt: '2024-10-10T17:30:39.765Z',
    deletedAt: null,
  },
};

export const createSchema_400 = {
  success: false,
  message: 'slug already registered',
  data: null,
};

export const findAllSchema_200 = {
  success: true,
  message: 'posts found successfully',
  data: {
    total: 1,
    totalPages: 1,
    data: [
      {
        id: 'ff1e2256-63fb-4425-89ab-fd6836f3906e',
        title: 'Como centralizar uma div',
        subtitle: 'Aprenda de uma vez por todos como centralizar uma div',
        slug: 'como-centralizar-uma-div',
        publishedAt: null,
      },
    ],
  },
};

export const findUniqueSchema_200 = {
  success: true,
  message: 'Users found successfully',
  data: {
    id: 'ff1e2256-63fb-4425-89ab-fd6836f3906e',
    title: 'Como centralizar uma div',
    subtitle: 'Aprenda de uma vez por todos como centralizar uma div',
    slug: 'como-centralizar-uma-div',
    content: 'Conteudo da publicação',
    authorId: '344d671d-98d4-4c03-aa1e-0dd59827d303',
    photo: null,
    photoDescription: 'é a imagem do VS Code com um código em HTML',
    language: 'ptBR',
    exclusive: false,
    published: false,
    publishedAt: null,
    createdAt: '2024-10-10T17:30:39.765Z',
    updatedAt: '2024-10-10T17:30:39.765Z',
    deletedAt: null,
  },
};

export const notFind_404 = {
  success: false,
  message: 'post not found',
  data: null,
};

export const updatePhotoSchema_200 = {
  success: true,
  message: 'Photo updated successfully',
  data: {
    id: 'ff1e2256-63fb-4425-89ab-fd6836f3906e',
    title: 'Como centralizar uma div',
    subtitle: 'Aprenda de uma vez por todos como centralizar uma div',
    slug: 'como-centralizar-uma-div',
    content: 'Conteudo da publicação',
    authorId: '344d671d-98d4-4c03-aa1e-0dd59827d303',
    photo:
      'https://szzdlumubcifnjrkoyah.supabase.co/storage/v1/object/public/blog/posts/ff1e2256-63fb-4425-89ab-fd6836f3906e.png',
    photoDescription: 'é a imagem do VS Code com um código em HTML',
    language: 'ptBR',
    exclusive: false,
    published: false,
    publishedAt: null,
    createdAt: '2024-10-10T17:30:39.765Z',
    updatedAt: '2024-10-10T18:10:38.826Z',
    deletedAt: null,
  },
};

export const updateSchema_200 = {
  success: true,
  message: 'User updated successfully',
  data: {
    id: 'ff1e2256-63fb-4425-89ab-fd6836f3906e',
    title: 'Como centralizar uma div',
    subtitle: 'Aprenda de uma vez por todos como centralizar uma div',
    slug: 'como-centralizar-uma-div',
    content: 'Conteudo da publicação',
    authorId: '344d671d-98d4-4c03-aa1e-0dd59827d303',
    photo:
      'https://szzdlumubcifnjrkoyah.supabase.co/storage/v1/object/public/blog/posts/ff1e2256-63fb-4425-89ab-fd6836f3906e.png',
    photoDescription: 'é a imagem do VS Code com um código em HTML',
    language: 'ptBR',
    exclusive: false,
    published: true,
    publishedAt: '2024-10-10T18:30:25.704Z',
    createdAt: '2024-10-10T17:30:39.765Z',
    updatedAt: '2024-10-10T18:30:25.705Z',
    deletedAt: null,
  },
};

export const deleteSchema_200 = {
  success: true,
  message: 'post deleted successfully',
  data: null,
};
