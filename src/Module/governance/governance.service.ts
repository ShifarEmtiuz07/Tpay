import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from './entities/proposal.entity';
import { Vote } from './entities/vote.entity';

@Injectable()
export class GovernanceService {
  constructor(
    @InjectRepository(Proposal) private proposalRepo: Repository<Proposal>,
    @InjectRepository(Vote) private voteRepo: Repository<Vote>
  ) {}

  async createProposal(title: string, description: string, creatorAddress: string, deadline: Date) {
   try{
     const proposal = this.proposalRepo.create({ title, description, creatorAddress, deadline });
    return this.proposalRepo.save(proposal);

   }catch(error){
    throw new InternalServerErrorException('Error creating proposal: '+error.message);
   }
  }

  async vote(proposalId: string, voterAddress: string, vote: 'yes' | 'no', weight: number) {
 
    try{
       const proposal = await this.proposalRepo.findOne({ where: { id: proposalId } });
    if (!proposal) throw new Error('Proposal not found');

    const voteRecord = this.voteRepo.create({ proposal, voterAddress, vote, weight });
    await this.voteRepo.save(voteRecord);

    if (vote === 'yes') proposal.yesVotes += weight;
    else proposal.noVotes += weight;

    return this.proposalRepo.save(proposal);

    }catch(error){
      throw new InternalServerErrorException("Voting error: "+error.message);
    }

   
  }

  async allProposals() {
    return await this.proposalRepo.find();
  }
}
