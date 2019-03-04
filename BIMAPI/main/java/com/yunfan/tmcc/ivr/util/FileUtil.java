package com.yunfan.tmcc.ivr.util;

import org.apache.commons.io.FileUtils;

import java.io.*;

public class FileUtil
{
    public static final String FILE_SEPARATOR = System.getProperty("file.separator");
    //public static final String FILE_SEPARATOR = File.separator;
    public FileUtil() {
        super();
    }
    public static String getRealFilePath(String path) {
        return path.replace("/", FILE_SEPARATOR).replace("\\", FILE_SEPARATOR);
    }
    public static String getHttpURLPath(String path) {
        return path.replace("\\", "/");
    }

    private byte[] getBytes(final String filePath) {
        byte[] buffer = null;
        try {
            final File file = new File(filePath);
            final FileInputStream fis = new FileInputStream(file);
            final ByteArrayOutputStream bos = new ByteArrayOutputStream(1000);
            final byte[] b = new byte[1000];
            int n;
            while ((n = fis.read(b)) != -1) {
                bos.write(b, 0, n);
            }
            fis.close();
            bos.close();
            buffer = bos.toByteArray();
        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        catch (IOException e2) {
            e2.printStackTrace();
        }
        return buffer;
    }
    
    public static void getFile(final byte[] bfile, final String filePath, final String fileName) {
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try {
            final File dir = new File(filePath);
            if (!dir.exists() && dir.isDirectory()) {
                dir.mkdirs();
            }
            file = new File(String.valueOf(filePath) + fileName);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(bfile);
        }
        catch (Exception e) {
            e.printStackTrace();
            if (bos != null) {
                try {
                    bos.close();
                }
                catch (IOException e2) {
                    e2.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                }
                catch (IOException e2) {
                    e2.printStackTrace();
                }
            }
            return;
        }
        finally {
            if (bos != null) {
                try {
                    bos.close();
                }
                catch (IOException e2) {
                    e2.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                }
                catch (IOException e2) {
                    e2.printStackTrace();
                }
            }
        }
        if (bos != null) {
            try {
                bos.close();
            }
            catch (IOException e2) {
                e2.printStackTrace();
            }
        }
        if (fos != null) {
            try {
                fos.close();
            }
            catch (IOException e2) {
                e2.printStackTrace();
            }
        }
    }

    public static double getDirSize(final File file) {
        if (!file.exists()) {
            System.out.println("文件或者文件夹不存在，请检查路径是否正确！");
            return 0.0;
        }
        if (file.isDirectory()) {
            final File[] children = file.listFiles();
            double size = 0.0;
            File[] array;
            for (int length = (array = children).length, i = 0; i < length; ++i) {
                final File f = array[i];
                size += getDirSize(f);
            }
            return size;
        }
        final double size2 = file.length() / 1024.0 / 1024.0;
        return size2;
    }
    
    public static void main(final String[] args) {
        final double totalSize = getDirSize(new File("f:\\360安全浏览器下载"));
        System.out.println(String.valueOf(totalSize) + "Mb");
        final long size = FileUtils.sizeOfDirectory(new File("f:\\360安全浏览器下载"));
        System.out.println("Size: " + size + " bytes");
        System.out.println(new File("F:\\图\\新建文件夹").lastModified());
        try {
            FileUtils.touch(new File("F:\\图\\新建文件夹"));
            System.out.println(new File("F:\\图\\新建文件夹").lastModified());
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}
