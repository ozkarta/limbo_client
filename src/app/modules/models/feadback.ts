export class Feadback{
    jobId: string;
    proposalId: string;
    candidateId: string;
    ownerId: string;

    score: string;
    text: string;
    constructor(){
        this.jobId = '';
        this.proposalId = '';
        this.candidateId = '';
        this.ownerId = '';
        
        this.score = '0';
        this.text = '';
    }
}