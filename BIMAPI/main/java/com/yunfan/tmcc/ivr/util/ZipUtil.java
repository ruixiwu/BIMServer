package com.yunfan.tmcc.ivr.util;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipFile;
import org.apache.tools.zip.ZipOutputStream;

import java.io.*;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class ZipUtil
{

    private static byte[] _byte = new byte[1024];
    private static final String ENCODE_UTF_8 = "UTF-8";
//
//    /**
//     * 压缩文件或路径
//     * @param zip 压缩的目的地址  例如：D://zipTest.zip
//     * @param srcFiles 压缩的源文件
//     */
//    public static void zipFile( String zip , List<File> srcFiles ){
//        try {
//            if( zip.endsWith(".zip") || zip.endsWith(".ZIP") ){//判断是否为压缩后的文件后缀是否为.zip结尾
//                ZipOutputStream _zipOut = new ZipOutputStream(new FileOutputStream(new File(zip))) ;
//                _zipOut.setEncoding(ENCODE_UTF_8);//设置编码
//                for( File _f : srcFiles ){
//                    zipFile(zip , _zipOut , _f , "");
//                }
//                _zipOut.close();
//            }else{
//                System.out.println("target file[" + zip + "] is not .zip type file");
//            }
//        } catch (FileNotFoundException e) {
//
//        } catch (IOException e) {
//        }
//    }
//
//
//    /**
//     *
//     * @param zip 压缩的目的地址  例如：D://zipTest.zip
//     * @param zipOut
//     * @param srcFile  被压缩的文件
//     * @param path  在zip中的相对路径
//     * @throws IOException
//     */
//    private static void zipFile(String zip , ZipOutputStream zipOut , File srcFile , String path ) throws IOException{
//        System.out.println(" 开始压缩文件[" + srcFile.getName() + "]");
//        if( !"".equals(path) && ! path.endsWith(File.separator)){
//            path += File.separator ;
//        }
//        if (!srcFile.exists()) {//测试此抽象路径名定义的文件或目录是否存在
//            System.out.println("压缩失败，文件或目录 " + srcFile + " 不存在!");
//        }else{
//            if( ! srcFile.getPath().equals(zip) ){
//                if( srcFile.isDirectory() ){
//                    File[] _files = srcFile.listFiles() ;//listFiles能够获取当前文件夹下的所有文件和文件夹，如果文件夹A下还有文件D，那么D也在childs里。
//                    if( _files.length == 0 ){
//                        zipOut.putNextEntry(new ZipEntry( path + srcFile.getName() + File.separator));
//                        zipOut.closeEntry();
//                    }else{
//                        for( File _f : _files ){
//                            zipFile( zip ,zipOut , _f , path + srcFile.getName() );
//                        }
//                    }
//                }else{
//                    FileInputStream _in = new FileInputStream(srcFile) ;
//                    zipOut.putNextEntry(new ZipEntry(path + srcFile.getName()));
//                    int len = 0 ;
//                    while( (len = _in.read(_byte)) > 0  ){
//                        zipOut.write(_byte, 0, len);
//                    }
//                    _in.close();
//                    zipOut.closeEntry();
//                }
//            }
//        }
//    }

    public static void zipFile(final String zip, final List<File> srcFiles) {
        try {
            if (zip.endsWith(".zip") || zip.endsWith(".ZIP")) {
                final ZipOutputStream _zipOut = new ZipOutputStream((OutputStream)new FileOutputStream(new File(zip)));
                _zipOut.setEncoding("GBK");
                for (final File _f : srcFiles) {
                    handlerFile(zip, _zipOut, _f, "");
                }
                _zipOut.close();
            }
            else {
                System.out.println("target file[" + zip + "] is not .zip type file");
            }
        }
        catch (FileNotFoundException ex) {}
        catch (IOException ex2) {}
    }
    
    private static void handlerFile(final String zip, final ZipOutputStream zipOut, final File srcFile, String path) throws IOException {
        System.out.println(" begin to compression file[" + srcFile.getName() + "]");
        if (!"".equals(path) && !path.endsWith(File.separator)) {
            path = String.valueOf(path) + File.separator;
        }
        if (!srcFile.getPath().equals(zip)) {
            if (srcFile.isDirectory()) {
                final File[] _files = srcFile.listFiles();
                if (_files.length == 0) {
                    zipOut.putNextEntry(new ZipEntry(String.valueOf(path) + srcFile.getName() + File.separator));
                    zipOut.closeEntry();
                }
                else {
                    File[] array;
                    for (int length = (array = _files).length, i = 0; i < length; ++i) {
                        final File _f = array[i];
                        handlerFile(zip, zipOut, _f, String.valueOf(path) + srcFile.getName());
                    }
                }
            }
            else {
                final InputStream _in = new FileInputStream(srcFile);
                zipOut.putNextEntry(new ZipEntry(String.valueOf(path) + srcFile.getName()));
                int len = 0;
                while ((len = _in.read(ZipUtil._byte)) > 0) {
                    zipOut.write(ZipUtil._byte, 0, len);
                }
                _in.close();
                zipOut.closeEntry();
            }
        }
    }

    /**
     * 解压缩ZIP文件，将ZIP文件里的内容解压到targetDIR目录下
     * @param zipPath 待解压缩的ZIP文件名
     * @param descDir  目标目录
     */
    public static List<File> upzipFile(String zipPath, String descDir) {
        return upzipFile( new File(zipPath) , descDir ) ;
    }

    /**
     * 对.zip文件进行解压缩
     * @param zipFile  解压缩文件
     * @param descDir  压缩的目标地址，如：D:\\测试 或 /mnt/d/测试
     * @return
     */
    @SuppressWarnings("rawtypes")
    public static List<File> upzipFile(File zipFile, String descDir) {
        List<File> _list = new ArrayList<File>() ;
        try {
            if(!zipFile.exists()){
                System.out.println("解压失败，文件 " + zipFile + " 不存在!");
                return _list ;
            }
            ZipFile _zipFile = new ZipFile(zipFile , ENCODE_UTF_8) ;
//            Enumeration entriesTest = _zipFile.getEntries() ;
//            entriesTest.hasMoreElements() ;
            for( Enumeration entries = _zipFile.getEntries() ; entries.hasMoreElements() ; ){
                ZipEntry entry = (ZipEntry)entries.nextElement() ;
                File _file = new File(descDir + File.separator + entry.getName()) ;
                if( entry.isDirectory() ){
                    _file.mkdirs() ;
                }else{
                    File _parent = _file.getParentFile() ;
                    if( !_parent.exists() ){
                        _parent.mkdirs() ;
                    }
                    InputStream _in = _zipFile.getInputStream(entry);
                    OutputStream _out = new FileOutputStream(_file) ;
                    int len = 0 ;
                    while( (len = _in.read(_byte)) > 0){
                        _out.write(_byte, 0, len);
                    }
                    _in.close();
                    _out.flush();
                    _out.close();
                    _list.add(_file) ;
                }
            }
        } catch (IOException e) {
            System.out.println("解压失败，文件损坏或者不是可以解压的文件");
            e.printStackTrace();
        }
        return _list ;
    }


    public static void deletefile(final String delpath) {
        try {
            final File file = new File(delpath);
            if (!file.isDirectory()) {
                file.delete();
            }
            else if (file.isDirectory()) {
                final String[] filelist = file.list();
                for (int i = 0; i < filelist.length; ++i) {
                    final File delfile = new File(String.valueOf(delpath) + File.separator + filelist[i]);
                    if (!delfile.isDirectory()) {
                        delfile.delete();
                    }
                    else if (delfile.isDirectory()) {
                        deletefile(String.valueOf(delpath) + File.separator + filelist[i]);
                    }
                }
                file.delete();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static void main(final String[] args) {
        final String zipFilePath = "D:\\1.zip";
        final String unzipFilePath = "D:\\123";
        upzipFile(zipFilePath, unzipFilePath);
        new File(zipFilePath).deleteOnExit();
        System.out.println("46456456");
    }
}
