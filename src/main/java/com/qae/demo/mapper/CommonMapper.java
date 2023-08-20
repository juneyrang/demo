package com.qae.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommonMapper {
    String selectKeyNo(@Param("numNo") Integer numNo);
    String selectDealNo(@Param("numNo") Integer numNo, @Param("afflAbbr") String afflAbbr);

    List<Map<String,Object>> selectMenuList();
}
