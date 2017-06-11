package com.dbpedia;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/**
 * 
 * TODO: not finished yet
 */
public class Main {

    public static ArrayList<String> getResolution(String str) throws Exception {

        //annotate(str);
        //System.out.println("Related Keywords " + start.getRelatedKeywordsFromLookup(str));
        ArrayList<String> Keywords = new ArrayList<>();
        SparqlClient sc = new SparqlClient();
        
        /**
         * TODO: not finished yet
         */
        return Keywords;

    }

    
    public static void main(String[] args) throws Exception {

//        String str = "President Obama called Wednesday on Congress to extend a tax break\n"
//                + "  for students included in last year's economic stimulus package, arguing\n"
//                + "  that the policy provides more generous assistance.";

        String str = "Depression is common in dementia but the evidence base for appropriate drug treatment is sparse and equivocal. We aimed to assess efficacy and safety of two of the most commonly prescribed drugs, sertraline and mirtazapine, compared with placebo. We undertook the parallel-group, double-blind, placebo-controlled, Health Technology Assessment Study of the Use of Antidepressants for Depression in Dementia (HTA-SADD) trial in participants from old-age psychiatry services in nine centres in England. Participants were eligible if they had probable or possible Alzheimer's disease, depression (lasting ≥4 weeks), and a Cornell scale for depression in dementia (CSDD) score of 8 or more. Participants were ineligible if they were clinically critical (eg, suicide risk), contraindicated to study drugs, on antidepressants, in another trial, or had no carer. The clinical trials unit at King's College London (UK) randomly allocated participants with a computer-generated block randomisation sequence, stratified by centre, with varying block sizes, in a 1:1:1 ratio to receive sertraline (target dose 150 mg per day), mirtazapine (45 mg), or placebo (control group), all with standard care. The primary outcome was reduction in depression (CSDD score) at 13 weeks (outcomes to 39 weeks were also assessed), assessed with a mixed linear-regression model adjusted for baseline CSDD, time, and treatment centre. This study is registered, number ISRCTN88882979 and EudraCT 2006-000105-38. Decreases in depression scores at 13 weeks did not differ between 111 controls and 107 participants allocated to receive sertraline (mean difference 1·17, 95% CI -0·23 to 2·58; p=0·10) or mirtazapine (0·01, -1·37 to 1·38; p=0·99), or between participants in the mirtazapine and sertraline groups (1·16, -0·25 to 2·57; p=0·11); these findings persisted to 39 weeks. Fewer controls had adverse reactions (29 of 111 [26%]) than did participants in the sertraline group (46 of 107, 43%; p=0·010) or mirtazapine group (44 of 108, 41%; p=0·031), and fewer serious adverse events rated as severe (p=0·003). Five patients in every group died by week 39. Because of the absence of benefit compared with placebo and increased risk of adverse events, the present practice of use of these antidepressants, with usual care, for first-line treatment of depression in Alzheimer's disease should be reconsidered. UK National Institute of Health Research HTA Programme.";
//        
        ArrayList<String> list = getResolution(str);
        Set<String> hs = new HashSet<>();
        hs.addAll(list);
        list.clear();
        list.addAll(hs);
        System.out.println("FINAL KEYWORDS : " + list);


    }

}