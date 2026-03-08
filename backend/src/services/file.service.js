const prisma = require('../config/database');

class FileService {
  // Upload a file
  async uploadFile(userId, fileData, moduleId = null) {
    const file = await prisma.fileUpload.create({
      data: {
        userId,
        moduleId,
        fileName: fileData.fileName,
        fileUrl: fileData.fileUrl,
        fileSizeBytes: fileData.fileSizeBytes,
        fileType: fileData.fileType,
      },
      select: {
        id: true,
        fileName: true,
        fileUrl: true,
        fileSizeBytes: true,
        fileType: true,
        uploadedAt: true,
      }
    });

    return file;
  }

  // Get user files
  async getUserFiles(userId, moduleId = null) {
    const where = { userId };
    if (moduleId) {
      where.moduleId = moduleId;
    }

    const files = await prisma.fileUpload.findMany({
      where,
      select: {
        id: true,
        fileName: true,
        fileUrl: true,
        fileSizeBytes: true,
        fileType: true,
        uploadedAt: true,
        module: {
          select: { id: true, title: true }
        }
      },
      orderBy: { uploadedAt: 'desc' }
    });

    return files;
  }

  // Get file by ID
  async getFileById(fileId, userId) {
    const file = await prisma.fileUpload.findUnique({
      where: { id: fileId }
    });

    if (!file || file.userId !== userId) {
      throw new Error('File not found or access denied');
    }

    return file;
  }

  // Delete file
  async deleteFile(fileId, userId) {
    const file = await prisma.fileUpload.findUnique({
      where: { id: fileId }
    });

    if (!file || file.userId !== userId) {
      throw new Error('File not found or access denied');
    }

    await prisma.fileUpload.delete({
      where: { id: fileId }
    });

    return { message: 'File deleted successfully' };
  }

  // Get resource files for module (public)
  async getModuleResources(moduleId) {
    const resources = await prisma.resource.findMany({
      where: { moduleId },
      orderBy: { orderNumber: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        fileUrl: true,
        fileType: true,
        fileSizeBytes: true,
      }
    });

    return resources;
  }
}

module.exports = new FileService();
