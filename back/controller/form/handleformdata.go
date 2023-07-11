package form

import (
	"encoding/csv"
	"io"
	"os"
)

type FormColItem struct {
	Title     string `json:"title"`
	DataIndex string `json:"dataIndex"`
}
type formDataItem struct {
	Attr map[string]interface{}
}

func ReadCsv(filepath string) ([]map[string]string, []FormColItem, bool) {
	//startTime := time.Now()

	file, err := os.Open(filepath)
	if err != nil {
		panic(err)
		return nil, nil, false
	}
	defer file.Close()
	reader := csv.NewReader(file)

	var formCol []FormColItem
	var formData []map[string]string
	var isFistLine bool = true
	var structMode map[string]string

	for {
		line, err := reader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			//c.String(400, err.Error())
			//return
		}
		if isFistLine {
			for item := range line {
				formCol = append(formCol, FormColItem{line[item], line[item]})
			}
			isFistLine = false

		} else {
			structMode = make(map[string]string)
			for i := range formCol {
				structMode[formCol[i].DataIndex] = line[i]
			}
			formData = append(formData, structMode)
		}

	}

	//程序段计时
	//elapsedTime := time.Since(startTime) / time.Millisecond // duration in ms
	//fmt.Printf("Segment finished in %d ms", elapsedTime)    //Segment finished in xxms
	return formData, formCol, true
}

//func ReadCsv(file_path string) (res [][]string) {
//	file, err := os.Open(file_path)
//	if err != nil {
//		Logger.Errorf("open_err:", err)
//		return
//	}
//	defer file.Close()
//	// 初始化csv-reader
//	reader := csv.NewReader(file)
//	// 设置返回记录中每行数据期望的字段数，-1 表示返回所有字段
//	reader.FieldsPerRecord = -1
//	// 允许懒引号（忘记遇到哪个问题才加的这行）
//	reader.LazyQuotes = true
//	// 返回csv中的所有内容
//	record, read_err := reader.ReadAll()
//	if read_err != nil {
//		Logger.Errorf("read_err:", read_err)
//		return
//	}
//	for i, value := range record {
//		record_utf := value
//		if !ValidUTF8([]byte(record_utf)) {
//			record_utf, _, _, _ = gogb2312.ConvertGB2312String(record_utf)
//		}
//		record_utf = strings.TrimSpace(record_utf)
//		record[i] = record_utf
//	}
//	return record
//}

//func ReadXls(file_path string) (res [][]string) {
//	if xlFile, err := xls.Open(file_path, "utf-8"); err == nil {
//		fmt.Println(xlFile.Author)
//		//第一个sheet
//		sheet := xlFile.GetSheet(0)
//		if sheet.MaxRow != 0 {
//			temp := make([][]string, sheet.MaxRow)
//			for i := 0; i < int(sheet.MaxRow); i++ {
//				row := sheet.Row(i)
//				data := make([]string, 0)
//				if row.LastCol() > 0 {
//					for j := 0; j < row.LastCol(); j++ {
//						col := row.Col(j)
//						data = append(data, col)
//					}
//					temp[i] = data
//				}
//			}
//			res = append(res, temp...)
//		}
//	} else {
//		Logger.Errorf("open_err:", err)
//	}
//	return res
//}
//
//func ReadXlsx(file_path string) (res [][]string) {
//	if xlFile, err := xlsx.OpenFile(file_path); err == nil {
//		for index, sheet := range xlFile.Sheets {
//			//第一个sheet
//			if index == 0 {
//				temp := make([][]string, len(sheet.Rows))
//				for k, row := range sheet.Rows {
//					var data []string
//					for _, cell := range row.Cells {
//						data = append(data, cell.Value)
//					}
//					temp[k] = data
//				}
//				res = append(res, temp...)
//			}
//		}
//	} else {
//		Logger.Errorf("open_err:", err)
//	}
//	return res
//}

// 校验中文编码
func ValidUTF8(buf []byte) bool {
	nBytes := 0
	for i := 0; i < len(buf); i++ {
		if nBytes == 0 {
			if (buf[i] & 0x80) != 0 { //与操作之后不为0，说明首位为1
				for (buf[i] & 0x80) != 0 {
					buf[i] <<= 1 //左移一位
					nBytes++     //记录字符共占几个字节
				}

				if nBytes < 2 || nBytes > 6 { //因为UTF8编码单字符最多不超过6个字节
					return false
				}

				nBytes-- //减掉首字节的一个计数
			}
		} else { //处理多字节字符
			if buf[i]&0xc0 != 0x80 { //判断多字节后面的字节是否是10开头
				return false
			}
			nBytes--
		}
	}
	return nBytes == 0
}
