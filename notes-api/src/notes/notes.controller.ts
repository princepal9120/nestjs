import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/auth/auth.gaurd';


@Controller('api/notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Request() req: { user: { sub: number } },
  ) {
    return this.noteService.create(createNoteDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Request() req: { user: { sub: number } },
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
  ) {
    return this.noteService.findAll(

      req.user.sub,
      { take: take || 10, skip: skip || 0 },
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { sub: number } },
  ) {
    return this.noteService.findOne(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req: { user: { sub: number } },
  ) {
    return this.noteService.update(id, updateNoteDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { sub: number } },
  ) {
    return this.noteService.remove(id, req.user.sub);
  }
}