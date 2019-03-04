package com.yunfan.tmcc.ivr.util;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;

public class FileListenerThread implements Runnable
{
    private static final Logger log;
    private String path;
    
    static {
        log = Logger.getLogger(FileListenerThread.class);
    }
    
    @Override
    public void run() {
        while (true) {
            try {
                while (true) {
                    final File file = new File(this.path);
                    final File[] files = file.listFiles();
                   // Arrays.<File>sort(files, (Comparator<? super File>)new FileListenerThread.CompratorByLastModified());
                    if(files==null){return;}//没有文件文件夹，或者文件夹为空，则返回
                    Arrays.sort(files, new FileComparator.CompratorByLastModified());//unzip文件夹进行排序

                    final int filelen = files.length;
                    final long total = FileUtils.sizeOfDirectory(file);
                    if (total >= Constant.ZipMaxSize) {
                        for (int j = 0; j < filelen; ++j) {
                            if (j <= filelen / 2) {
                                try {
                                    final String oldFileName = files[j].getName();
                                    final File newFile = new File(String.valueOf(this.path) + File.separator + oldFileName + "_0");
                                    if (files[j].renameTo(newFile)) {
                                        FileUtils.forceDelete(newFile);
                                        FileListenerThread.log.info("======================================================================");
                                        FileListenerThread.log.info(("删除了： " + oldFileName + " 目录"));
                                    }
                                }
                                catch (IOException e) {
                                    e.printStackTrace();
                                    FileListenerThread.log.error("{}", e);
                                }
                            }
                        }
                    }
                    final long totalNew = FileUtils.sizeOfDirectory(file);
                    if (totalNew <= Constant.ZipNormalSize) {
                        Thread.sleep(600000L);
                    }
                    else {
                        Thread.sleep(300000L);
                    }
                }
            }
            catch (InterruptedException e3) {
                try {
                    Thread.sleep(60000L);
                }
                catch (InterruptedException e2) {
                    FileListenerThread.log.error("{}", e2);
                }
                FileListenerThread.log.error("{}", e3);
                continue;
            }
           // break;
        }
    }
    
    public void setPath(final String path) {
        this.path = path;
    }
    
    public FileListenerThread(final String path) {
        super();
        this.path = path;
    }
}
