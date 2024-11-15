import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const saveImgToStorage = {
  storage: diskStorage({
    filename: (req, file, cb) => {
      const fileExt: string = extname(file.originalname);
      const fileName: string = uuid() + fileExt;

      cb(null, fileName);
    },
  }),
};
