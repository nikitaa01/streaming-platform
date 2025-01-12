import { HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { env } from 'src/constants/env';
import { User } from 'src/user/entities/user.entity';
import { CurrentFile, File } from './types';

const removeRepeatedSlashes = (path: string): string =>
  path.replace(/\/{2,}/g, '/');

const getFileFromPath = async ({
  path,
  file,
  startPath,
}: {
  path: string;
  file: string;
  startPath: string;
}): Promise<File> => {
  const filePath = removeRepeatedSlashes(`${path}/${file}`);

  try {
    const stats = await fs.promises.stat(startPath + '/' + file);

    const isDir = stats.isDirectory();

    return {
      name: file,
      isDir,
      url: `/api/file/?path=${filePath}`,
      path: filePath,
    };
  } catch (e) {
    console.log(e);
    if (e.code !== 'ENOTDIR') {
      throw new HttpException('Invalid path', 400);
    }
    return {
      name: file,
      isDir: false,
      url: `/api/file/?path=${filePath}`,
      path: filePath,
    };
  }
};

@Injectable()
export class FileService {
  async getFile(path: string, user: User): Promise<CurrentFile> {
    const startPath = `${env.FILES_ROOT}/${user.username}${path}`;

    try {
      const pathSplitted = path.split('/');
      const fileName = pathSplitted.pop();
      const parentPath = pathSplitted.join('/');

      const file = await getFileFromPath({
        file: fileName,
        path: parentPath,
        startPath: `${env.FILES_ROOT}/${user.username}${parentPath}`,
      });
      const dir: CurrentFile = {
        ...file,
        files: [],
      };
      if (!dir.isDir) {
        return dir;
      }

      const files = await fs.promises.readdir(startPath);

      const filesStatsPromises = files.map(async (file): Promise<File> => {
        return getFileFromPath({ file, path, startPath });
      });

      const filesStatsSettled = await Promise.allSettled(filesStatsPromises);

      filesStatsSettled.forEach((file) => {
        if (file.status !== 'fulfilled') {
          return;
        }

        const isVideo = /\.(mov|mp4|avi|mkv|flv|wmv|webm)$/i.test(
          file.value.name,
        );

        if (!isVideo && !file.value.isDir) {
          return;
        }

        dir.files.push(file.value);
      });

      return dir;
    } catch (e) {
      console.log(e);
      throw new HttpException('Invalid path', 400);
    }
  }

  getVideoChunk(path: string, res: Response, req: Request) {
    const videoPath = `${env.FILES_ROOT}/${req.user.username}${path}`;
    let videoStat: fs.Stats;
    try {
      videoStat = fs.statSync(videoPath);
    } catch {
      throw new HttpException('Invalid file', 400);
    }
    if (!videoStat.isFile()) {
      throw new HttpException("It's not a file", 400);
    }

    const fileSize = videoStat.size;

    const range = req.headers.range;
    if (range) {
      const [start, end] = range
        .replace(/bytes=/, '')
        .split('-')
        .map((v) => parseInt(v, 10));

      const chunkStart = start || 0;
      const chunkEnd = end || Math.min(chunkStart + 10 ** 6, fileSize - 1);
      const chunkSize = chunkEnd - chunkStart + 1;

      const fileStream = fs.createReadStream(videoPath, {
        start: chunkStart,
        end: chunkEnd,
      });

      res.writeHead(206, {
        'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });

      fileStream.pipe(res);
      return;
    }
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    });
    fs.createReadStream(videoPath).pipe(res);
  }
}
