import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Test')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('Test')
export class TestController {
  constructor(private readonly testService: TestService) {}


   /**
	 * @param req
	 * @returns Test
	 */
  @Post('/create')
  @ApiOperation({ summary: 'Create a complete test' })
  create(@Body() dto: CreateTestDto,@LoggedUser() user:User) {
    return this.testService.create(dto,user);
  }

  /**
	 * @param req
	 * @returns Tests
	 */
  @Get('/allTests')
  @ApiOperation({summary: `To list all tests`})
  findAll(@LoggedUser() user:User) {
    return this.testService.findAll(user);
  }

    /**
	 * @param req
	 * @returns Test
	 */
  @Patch(':id')
  @ApiOperation({summary: `To make changes to a test`})
  update(@Param('id') id: string, @Body() dto: UpdateTestDto,@LoggedUser() user:User) {
    return this.testService.update(id,dto,user);
  }

    /**
	 * @param req
	 * @returns Message: 'Teste deletado com sucesso!'
	 */
  @Delete(':id')
  @ApiOperation({summary: `To delete a test`})
  remove(@Param('id') id:string,@LoggedUser() user:User) {
    return this.testService.remove(id,user);
  }
}
