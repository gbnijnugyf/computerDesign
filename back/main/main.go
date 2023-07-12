package main

import (
	"back/controller/form"
)

func main() {
	//r := routes.SetRouter()
	//
	//err := r.Run(":8080")
	//
	//if err != nil {
	//	fmt.Println("服务器启动失败！")
	//}
	form.ReadXlsx("./formdata/form_2.xlsx")
}
