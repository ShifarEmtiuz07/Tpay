import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GovernanceService } from './governance.service';
import { CreateGovernanceDto } from './dto/create-governance.dto';
import { UpdateGovernanceDto } from './dto/update-governance.dto';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { VoteDto } from './dto/vote.dto';

@Controller('governance')
export class GovernanceController {
  constructor(private readonly governanceService: GovernanceService) {}

@Post('proposal')
  create(@Body() body: CreateProposalDto) {
    return  this.governanceService.createProposal(
      body.title,
      body.description,
      body.creatorAddress,
      new Date(body.deadline),
    );
  }

  @Post('vote/:proposalId')
  vote(@Param('proposalId') id: string, @Body() body: VoteDto) {
    return  this.governanceService.vote(id, body.voterAddress, body.vote, body.weight);
  }

  @Get('proposals')
  findAll() {
    return this.governanceService.allProposals();
  }
}
