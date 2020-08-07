import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller("/uploads")
export class UploadController {


    @Get(':name')
    async get(
        @Param('name') name,
        @Res() res
    ){
        return res.sendFile(name, { root: './uploads' });
    }

 }
