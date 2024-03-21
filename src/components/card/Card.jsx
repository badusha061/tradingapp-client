import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export function CardWithForm() {
  return (
    <Card className="w-[350px] bg-white ">
      <CardHeader>
        <div className=" text-black " >
          <CardTitle>Register Form</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label  className="text-black" htmlFor="name">Username</Label>
              <Input id="name" placeholder="Enter your Username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  className="text-black"  htmlFor="password">Password</Label>
              <Input id="pwd" type="password" placeholder="Enter  your Password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  className="text-black" htmlFor="password">Conform Password</Label>
              <Input id="pwd" type="password" placeholder="Conform Your Password" />
            </div>
            <div className="flex flex-col space-y-1.5" >
                <Button   >
                    Register
                </Button>
            </div>
          </div>
        </form>
        
      </CardContent>
    </Card>
  )
}
