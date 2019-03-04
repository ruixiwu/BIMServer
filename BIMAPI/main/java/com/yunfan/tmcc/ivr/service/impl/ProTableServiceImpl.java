package com.yunfan.tmcc.ivr.service.impl;

import com.yunfan.tmcc.ivr.model.ModelPrp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.yunfan.tmcc.ivr.dao.GeoTableMapper;
import com.yunfan.tmcc.ivr.dao.FmyItemTableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import com.yunfan.tmcc.ivr.dao.ProTableMapper;
import org.springframework.stereotype.Service;
import com.yunfan.tmcc.ivr.service.ProTableService;

@Service
public class ProTableServiceImpl implements ProTableService
{
    @Autowired
    private ProTableMapper proTableMapper;
    private FmyItemTableMapper fmyItemTableMapper;
    private GeoTableMapper geoTableMapper;
    
    public ProTableServiceImpl() {
        super();
    }
    
    public List<Map<String, Object>> selectProTableById(final Map<String, Object> paramMap) throws Exception {
        return this.proTableMapper.selectProTableById(paramMap);
    }
    
    public int insertProTable(final Map<String, Object> paramMap) throws Exception {
        return this.proTableMapper.insertProTable(paramMap);
    }
    
    public int createTable(final String strTableName) throws Exception {
        return this.proTableMapper.createTable(strTableName);
    }
    
    public List<Map<String, Object>> selectProTableByValue(final Map<String, Object> paramMap) throws Exception {
        return this.proTableMapper.selectProTableByValue(paramMap);
    }
    
    public Map<String, Object> selectProByGeoID(final int nProjectId, final int nGeoId) throws Exception {
        Map<String, Object> RetMap = new HashMap<String, Object>();
        List<Map<String, Object>> retList = null;
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("TABLENAME", "PROTABLE_" + String.valueOf(nProjectId));
        paramMap.put("GEOID", nGeoId);
        retList = this.proTableMapper.selectProTableById(paramMap);
        if (retList.size() == 0) {
            return RetMap;
        }
        RetMap = retList.get(0);
        paramMap.clear();
        Map<String, Object> retMapGeo = null;
        paramMap.put("TABLENAME", "GEOTABLE_" + String.valueOf(nProjectId));
        paramMap.put("OBJECTID", nGeoId);
        retMapGeo = this.geoTableMapper.selectGeoTableById(paramMap);
        final int nFamilyId = Integer.parseInt(retMapGeo.get("FAMILYID").toString());
        if (nFamilyId < 1) {
            return RetMap;
        }
        List<Map<String, Object>> retListPrp = null;
        paramMap.clear();
        paramMap.put("TABLENAME", "FMYITEMTABLE_" + String.valueOf(nProjectId));
        paramMap.put("familyid", nFamilyId);
        retListPrp = this.fmyItemTableMapper.selectByFamilyId(paramMap);
        if (retListPrp.size() == 0) {
            return RetMap;
        }
        RetMap.putAll(retListPrp.get(0));
        return RetMap;
    }
    
    public List<Map<String, Object>> selectByParam(final Map<String, Object> paramMap) throws Exception {
        return this.proTableMapper.selectByParam(paramMap);
    }
    
    public int insert(final ModelPrp modelPrp, final String Prefixion) throws Exception {
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("SECTION", modelPrp.getSection());
        paramMap.put("NAME", modelPrp.getName());
        paramMap.put("VALUE", modelPrp.getValue());
        paramMap.put("UNIT", modelPrp.getUnit());
        paramMap.put("TYPE", modelPrp.getType());
        paramMap.put("GEOID", modelPrp.getGeoId());
        paramMap.put("TABLENAME", "PROTABLE" + Prefixion);
        return this.proTableMapper.insertProTable(paramMap);
    }
}
