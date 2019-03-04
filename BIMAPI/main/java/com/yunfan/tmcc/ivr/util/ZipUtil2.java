package com.yunfan.tmcc.ivr.util;

import org.apache.commons.lang3.StringUtils;

import java.io.*;
import java.util.Enumeration;
import java.util.zip.*;

public class ZipUtil2
{
    public ZipUtil2() {
        super();
    }
    
    private static void zip(final String srcRootDir, final File file, final ZipOutputStream zos) throws Exception {
        if (file == null) {
            return;
        }
        if (file.isFile()) {
            final int bufferLen = 1024;
            final byte[] data = new byte[bufferLen];
            String subPath = file.getAbsolutePath();
            final int index = subPath.indexOf(srcRootDir);
            if (index != -1) {
                subPath = subPath.substring(srcRootDir.length() + File.separator.length());
            }
            final ZipEntry entry = new ZipEntry(subPath);
            zos.putNextEntry(entry);
            final BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
            int count;
            while ((count = bis.read(data, 0, bufferLen)) != -1) {
                zos.write(data, 0, count);
            }
            bis.close();
            zos.closeEntry();
        }
        else {
            final File[] childFileList = file.listFiles();
            for (int n = 0; n < childFileList.length; ++n) {
                childFileList[n].getAbsolutePath().indexOf(file.getAbsolutePath());
                zip(srcRootDir, childFileList[n], zos);
            }
        }
    }
    
    public static void zipListFile(final String path, final String zipPath, final String zipFileName) throws Exception {
        CheckedOutputStream cos = null;
        ZipOutputStream zos = null;
        try {
            final String zipFilePath = String.valueOf(zipPath) + File.separator + zipFileName;
            final File zipFile = new File(zipFilePath);
            if (zipFile.exists()) {
                return;
            }
            final File dir = new File(path);
            cos = new CheckedOutputStream(new FileOutputStream(zipFile), new CRC32());
            zos = new ZipOutputStream(cos);
            zip(dir.getAbsolutePath(), dir, zos);
            zos.flush();
        }
        catch (Exception e) {
            throw e;
        }
        finally {
            try {
                if (zos != null) {
                    zos.close();
                }
            }
            catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        try {
            if (zos != null) {
                zos.close();
            }
        }
        catch (Exception e2) {
            e2.printStackTrace();
        }
    }
    
    public static void zip(final String srcPath, final String zipPath, final String zipFileName) throws Exception {
        if (StringUtils.isEmpty(srcPath) || StringUtils.isEmpty(zipPath) || StringUtils.isEmpty(zipFileName)) {
            throw new Exception("参数为空");
        }
        CheckedOutputStream cos = null;
        ZipOutputStream zos = null;
        try {
            final File srcFile = new File(srcPath);
            if (srcFile.isDirectory() && zipPath.indexOf(srcPath) != -1) {
                throw new Exception("保存的路径为源文件路径的子文件夹");
            }
            final File zipDir = new File(zipPath);
            if (!zipDir.exists() || !zipDir.isDirectory()) {
                zipDir.mkdirs();
            }
            final String zipFilePath = String.valueOf(zipPath) + File.separator + zipFileName;
            final File zipFile = new File(zipFilePath);
            if (zipFile.exists()) {
                final SecurityManager securityManager = new SecurityManager();
                securityManager.checkDelete(zipFilePath);
                zipFile.delete();
            }
            cos = new CheckedOutputStream(new FileOutputStream(zipFile), new CRC32());
            zos = new ZipOutputStream(cos);
            String srcRootDir = srcPath;
            if (srcFile.isFile()) {
                final int index = srcPath.lastIndexOf(File.separator);
                if (index != -1) {
                    srcRootDir = srcPath.substring(0, index);
                }
            }
            zip(srcRootDir, srcFile, zos);
            zos.flush();
        }
        catch (Exception e) {
            throw e;
        }
        finally {
            try {
                if (zos != null) {
                    zos.close();
                }
            }
            catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        try {
            if (zos != null) {
                zos.close();
            }
        }
        catch (Exception e2) {
            e2.printStackTrace();
        }
    }
    
    public static void unzip(final String zipFilePath, String unzipFilePath, final boolean includeZipFileName) throws Exception {
        if (StringUtils.isEmpty(zipFilePath) || StringUtils.isEmpty(unzipFilePath)) {
            throw new Exception("参数为空");
        }
        final File zipFile = new File(zipFilePath);
        if (includeZipFileName) {
            String fileName = zipFile.getName();
            if (StringUtils.isNotEmpty(fileName)) {
                fileName = fileName.substring(0, fileName.lastIndexOf("."));
            }
            unzipFilePath = String.valueOf(unzipFilePath) + File.separator + fileName;
        }
        final File unzipFileDir = new File(unzipFilePath);
        if (!unzipFileDir.exists() || !unzipFileDir.isDirectory()) {
            unzipFileDir.mkdirs();
        }
        ZipEntry entry = null;
        String entryFilePath = null;
        String entryDirPath = null;
        File entryFile = null;
        File entryDir = null;
        int index = 0;
        int count = 0;
        final int bufferSize = 1024;
        final byte[] buffer = new byte[bufferSize];
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        final ZipFile zip = new ZipFile(zipFile);
        final Enumeration<ZipEntry> entries = (Enumeration<ZipEntry>)zip.entries();
        while (entries.hasMoreElements()) {
            entry = entries.nextElement();
            entryFilePath = String.valueOf(unzipFilePath) + File.separator + entry.getName();
            index = entryFilePath.lastIndexOf(File.separator);
            if (index != -1) {
                entryDirPath = entryFilePath.substring(0, index);
            }
            else {
                entryDirPath = "";
            }
            entryDir = new File(entryDirPath);
            if (!entryDir.exists() || !entryDir.isDirectory()) {
                entryDir.mkdirs();
            }
            entryFile = new File(entryFilePath);
            if (entryFile.exists()) {
                final SecurityManager securityManager = new SecurityManager();
                securityManager.checkDelete(entryFilePath);
                entryFile.delete();
            }
            bos = new BufferedOutputStream(new FileOutputStream(entryFile));
            bis = new BufferedInputStream(zip.getInputStream(entry));
            while ((count = bis.read(buffer, 0, bufferSize)) != -1) {
                bos.write(buffer, 0, count);
            }
            bos.flush();
            bos.close();
        }
    }
    
    public static void main(final String[] args) {
        final String zipFilePath = "F:\\360安全浏览器下载\\apache-maven-3.2.5-bin.zip";
        final String unzipFilePath = "G:\\123";
        final boolean includeZipFileName = false;
        try {
            unzip(zipFilePath, unzipFilePath, includeZipFileName);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
