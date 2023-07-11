package main

import (
	"back/routes"
	"fmt"
)

func main() {
	r := routes.SetRouter()

	err := r.Run(":8080")

	if err != nil {
		fmt.Println("服务器启动失败！")
	}

}
