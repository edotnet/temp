import { Box, Container, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Card } from "../../infrastructure/components/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import ReactJson from "react-json-view";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Hr } from "../../infrastructure/components/Hr.component";
import SortableTable from "../../infrastructure/components/SortableTable";

export const DrugshotFeature = () => {
  const url = `/drugshot/api/search`;
  const mockData = {
    "PubMedID_count": 25151,
    "drug_count": {
        "(r)-praziquantel": [
            1,
            0.002881844380403458
        ],
        "10-hydroxycamptothecin": [
            1,
            0.0037735849056603774
        ],
        "2-aminopurine": [
            1,
            0.000724112961622013
        ],
        "5-beta-androstane-3,17-dione": [
            1,
            0.01694915254237288
        ],
        "8-azaguanine": [
            1,
            0.0012254901960784314
        ],
        "9-aminocamptothecin": [
            2,
            0.01639344262295082
        ],
        "A-23187": [
            1,
            8.41609156707625e-05
        ],
        "AT-9283": [
            1,
            0.043478260869565216
        ],
        "CHIR-99021": [
            1,
            0.004347826086956522
        ],
        "DMBA": [
            6,
            0.0010067114093959733
        ],
        "NVP-BEZ235": [
            1,
            0.00267379679144385
        ],
        "NVP-BGJ398": [
            1,
            0.011111111111111112
        ],
        "PD-98059": [
            1,
            0.00020420665713702266
        ],
        "SB-431542": [
            1,
            0.002028397565922921
        ],
        "SN-38": [
            95,
            0.012822243217708192
        ],
        "TNP-470": [
            1,
            0.002178649237472767
        ],
        "YM-155": [
            1,
            0.0051813471502590676
        ],
        "ZM-241385": [
            1,
            0.002824858757062147
        ],
        "abacavir": [
            2,
            0.0016326530612244899
        ],
        "abemaciclib": [
            1,
            0.006060606060606061
        ],
        "acebutolol": [
            1,
            0.0011737089201877935
        ],
        "aceclofenac": [
            1,
            0.0034129692832764505
        ],
        "acenocoumarol": [
            1,
            0.0007401924500370096
        ],
        "acetaminophen": [
            3,
            0.00015660889538525788
        ],
        "acetazolamide": [
            1,
            0.0001457725947521866
        ],
        "acetylcysteine amide": [
            1,
            0.0004930966469428008
        ],
        "acitretin": [
            30,
            0.024916943521594685
        ],
        "aclarubicin": [
            22,
            0.02696078431372549
        ],
        "activated charcoal": [
            4,
            0.0002863483427589663
        ],
        "acyclovir": [
            4,
            0.0002726095549649015
        ],
        "adamantane": [
            4,
            0.0003758338814244104
        ],
        "adapalene": [
            2,
            0.005012531328320802
        ],
        "adefovir dipivoxil": [
            1,
            0.0016286644951140066
        ],
        "adrabetadex": [
            4,
            0.0024875621890547263
        ],
        "afatinib": [
            3,
            0.003787878787878788
        ],
        "afuresertib": [
            1,
            0.09090909090909091
        ],
        "aica ribonucleotide": [
            1,
            0.0007892659826361484
        ],
        "albendazole": [
            17,
            0.003684438664932813
        ],
        "alfacalcidol": [
            7,
            0.006782945736434108
        ],
        "alisertib": [
            2,
            0.01
        ],
        "aliskiren": [
            1,
            0.0010604453870625664
        ],
        "alitretinoin": [
            6,
            0.00784313725490196
        ],
        "alizapride": [
            1,
            0.010869565217391304
        ],
        "allopurinol": [
            8,
            0.0010218418699706221
        ],
        "alphacetylmethadol": [
            1,
            0.0024630541871921183
        ],
        "altretamine": [
            3,
            0.006741573033707865
        ],
        "amantadine": [
            2,
            0.00032653061224489796
        ],
        "amifostine": [
            11,
            0.00694006309148265
        ],
        "aminobenzoic acid": [
            4,
            0.0015267175572519084
        ],
        "aminoglutethimide": [
            1,
            0.0007077140835102619
        ],
        "aminophenazone": [
            1,
            0.000176522506619594
        ],
        "aminophylline": [
            2,
            0.000474158368895211
        ],
        "aminopterin": [
            303,
            0.007522530350803148
        ],
        "aminosalicylic acid": [
            2,
            0.0005138746145940391
        ],
        "amiodarone": [
            5,
            0.0006389776357827476
        ],
        "amithiozone": [
            2,
            0.0029411764705882353
        ],
        "amitraz": [
            9,
            0.022004889975550123
        ],
        "amitriptyline": [
            2,
            0.000299895036737142
        ],
        "ammonium lactate": [
            11,
            0.00024270238068971605
        ],
        "amobarbital": [
            1,
            0.0003891050583657588
        ],
        "amonafide": [
            3,
            0.02608695652173913
        ],
        "amoxicillin": [
            7,
            0.000597473540457494
        ],
        "amphetamine": [
            4,
            0.00010353842569823726
        ],
        "amphotericin-b": [
            1,
            6.271558482282847e-05
        ],
        "ampicillin": [
            10,
            0.00035513885929398396
        ],
        "amrubicin": [
            7,
            0.03070175438596491
        ],
        "amsacrine": [
            11,
            0.009458297506448839
        ],
        "amuvatinib": [
            1,
            0.0625
        ],
        "anagrelide": [
            1,
            0.003289473684210526
        ],
        "anastrozole": [
            5,
            0.0034153005464480873
        ],
        "androstenediol": [
            1,
            0.00267379679144385
        ],
        "androstenol": [
            289,
            0.0035135496577632427
        ],
        "androsterone": [
            9,
            0.004186046511627907
        ],
        "angiotensin ii": [
            2,
            5.270092226613966e-05
        ],
        "anidulafungin": [
            1,
            0.0019342359767891683
        ],
        "annamycin": [
            1,
            0.034482758620689655
        ],
        "anthralin": [
            37,
            0.03978494623655914
        ],
        "apigenin": [
            1,
            0.00044169611307420494
        ],
        "apixaban": [
            2,
            0.0009629272989889263
        ],
        "apremilast": [
            10,
            0.0228310502283105
        ],
        "aprepitant": [
            1,
            0.001524390243902439
        ],
        "aspirin": [
            11,
            0.000236971929597794
        ],
        "astaxanthin": [
            1,
            0.0006207324643078833
        ],
        "atazanavir": [
            3,
            0.0028169014084507044
        ],
        "atorvastatin": [
            3,
            0.0004351610095735422
        ],
        "atovaquone": [
            1,
            0.0012285012285012285
        ],
        "auranofin": [
            2,
            0.0020833333333333333
        ],
        "aurothioglucose": [
            4,
            0.002616088947024199
        ],
        "axitinib": [
            2,
            0.00338409475465313
        ],
        "azacitidine": [
            3,
            0.00040966816878328555
        ],
        "azathioprine": [
            68,
            0.004556724519198553
        ],
        "azelaic acid": [
            3,
            0.007246376811594203
        ],
        "bacampicillin": [
            1,
            0.005780346820809248
        ],
        "baclofen": [
            1,
            0.00017415534656913968
        ],
        "baricitinib": [
            10,
            0.03571428571428571
        ],
        "beclometasone": [
            1,
            0.0003284072249589491
        ],
        "belinostat": [
            1,
            0.006097560975609756
        ],
        "belotecan": [
            2,
            0.034482758620689655
        ],
        "bendamustine": [
            9,
            0.009868421052631578
        ],
        "benoxaprofen": [
            1,
            0.0031446540880503146
        ],
        "bentiromide": [
            1,
            0.006711409395973154
        ],
        "benzodiazepine": [
            12,
            0.0001793775598672606
        ],
        "benzyl benzoate": [
            1,
            0.0007535795026375283
        ],
        "benzylpenicillin": [
            38,
            0.0009519038076152305
        ],
        "beta-alanine": [
            14,
            0.0023458445040214475
        ],
        "beta-hydroxyisovaleric acid": [
            1,
            0.0024271844660194173
        ],
        "beta-sitosterol": [
            4,
            0.002396644697423607
        ],
        "betamethasone": [
            77,
            0.010107639800472565
        ],
        "betamethasone phosphate": [
            1,
            0.0045045045045045045
        ],
        "bethanechol": [
            1,
            0.0010482180293501049
        ],
        "bexarotene": [
            7,
            0.012915129151291513
        ],
        "bicalutamide": [
            5,
            0.004299226139294927
        ],
        "bimatoprost": [
            21,
            0.038391224862888484
        ],
        "binimetinib": [
            1,
            0.0078125
        ],
        "biochanin-a": [
            1,
            0.002967359050445104
        ],
        "biopterin": [
            2,
            0.00038402457757296467
        ],
        "biotin": [
            71,
            0.004967119070938855
        ],
        "bisoprolol": [
            2,
            0.0017574692442882249
        ],
        "bleomycin": [
            147,
            0.009242957746478873
        ],
        "bms-188797": [
            1,
            0.14285714285714285
        ],
        "bms-908662": [
            1,
            0.3333333333333333
        ],
        "boldenone": [
            2,
            0.011299435028248588
        ],
        "bortezomib": [
            6,
            0.0009694619486185168
        ],
        "bradykinin": [
            2,
            0.00014114326040931546
        ],
        "brincidofovir": [
            1,
            0.010101010101010102
        ],
        "bromocriptine": [
            2,
            0.00028555111364934324
        ],
        "brostallicin": [
            1,
            0.058823529411764705
        ],
        "broxuridine": [
            7,
            0.0005393327683180522
        ],
        "bucillamine": [
            1,
            0.005319148936170213
        ],
        "budesonide": [
            2,
            0.00042052144659377626
        ],
        "buparlisib": [
            1,
            0.004545454545454545
        ],
        "bupivacaine": [
            1,
            8.034709946970914e-05
        ],
        "buspirone": [
            1,
            0.0005200208008320333
        ],
        "busulfan": [
            26,
            0.0055049756510692355
        ],
        "cabazitaxel": [
            3,
            0.005813953488372093
        ],
        "cabergoline": [
            2,
            0.0017467248908296944
        ],
        "cadmium-chloride": [
            1,
            0.00038774718883288094
        ],
        "caffeine": [
            18,
            0.0007491571981520789
        ],
        "calcifediol": [
            7,
            0.0016770483948251077
        ],
        "calcipotriol": [
            8,
            0.007662835249042145
        ],
        "calcitriol": [
            78,
            0.005396803431813465
        ],
        "calcium carbimide": [
            1,
            0.0017301038062283738
        ],
        "calcium threonate": [
            1,
            0.02127659574468085
        ],
        "camptothecin": [
            154,
            0.010484035672952549
        ],
        "canavanine": [
            1,
            0.0014970059880239522
        ],
        "canertinib": [
            1,
            0.011764705882352941
        ],
        "canrenone": [
            1,
            0.004048582995951417
        ],
        "cantharidin": [
            5,
            0.006134969325153374
        ],
        "capecitabine": [
            72,
            0.014687882496940025
        ],
        "capsaicin": [
            5,
            0.0004669842159335014
        ],
        "captopril": [
            4,
            0.000396589331746976
        ],
        "carbamazepine": [
            18,
            0.001568627450980392
        ],
        "carbimazole": [
            1,
            0.0009066183136899365
        ],
        "carboplatin": [
            241,
            0.019796287169377362
        ],
        "carboquone": [
            1,
            0.0053475935828877
        ],
        "carmustine": [
            20,
            0.004943153732081068
        ],
        "carnosine": [
            1,
            0.0005263157894736842
        ],
        "casopitant": [
            1,
            0.02564102564102564
        ],
        "catechin": [
            11,
            0.001041568033330177
        ],
        "cefacetrile": [
            4,
            0.0002628984554715741
        ],
        "cefalexin": [
            5,
            0.0014731879787860931
        ],
        "cefaloridine": [
            1,
            0.00017500875043752187
        ],
        "cefalotin": [
            1,
            0.00040257648953301127
        ],
        "cefotaxime": [
            3,
            0.0002420916720464816
        ],
        "ceftiofur": [
            1,
            0.001976284584980237
        ],
        "ceftriaxone": [
            1,
            0.00015669069257286117
        ],
        "celecoxib": [
            4,
            0.0008748906386701663
        ],
        "cephalexin": [
            5,
            0.0014731879787860931
        ],
        "cephalotaxine": [
            1,
            0.0023094688221709007
        ],
        "ceramide": [
            7,
            0.0004958560600694198
        ],
        "ceruletide": [
            1,
            0.00034626038781163435
        ],
        "cetirizine": [
            8,
            0.005818181818181818
        ],
        "chiniofon": [
            11,
            0.0014810825366904537
        ],
        "chlorambucil": [
            38,
            0.009865005192107996
        ],
        "chloramphenicol": [
            7,
            0.000345713156854998
        ],
        "chlordiazepoxide": [
            2,
            0.0005145356315924878
        ],
        "chlorhexidine": [
            5,
            0.0005690871841566128
        ],
        "chlormadinone": [
            22,
            0.015471167369901548
        ],
        "chloroquine": [
            61,
            0.003189375718916658
        ],
        "chlorothiazide": [
            1,
            0.00011358473421172194
        ],
        "chlorotrianisene": [
            1,
            0.008403361344537815
        ],
        "chloroxylenol": [
            1,
            0.006756756756756757
        ],
        "chlorphenamine": [
            1,
            0.000508646998982706
        ],
        "chlorpromazine": [
            6,
            0.00034674063800277393
        ],
        "chlorquinaldol": [
            1,
            0.007874015748031496
        ],
        "chlorsulfaquinoxaline": [
            2,
            0.14285714285714285
        ],
        "chlortetracycline": [
            1,
            0.0001802776275464215
        ],
        "cholecalciferol": [
            100,
            0.0036387453605996652
        ],
        "cianidanol": [
            11,
            0.001041568033330177
        ],
        "ciclopirox": [
            3,
            0.007159904534606206
        ],
        "cidofovir": [
            4,
            0.003129890453834116
        ],
        "cilostazol": [
            1,
            0.0007320644216691069
        ],
        "cimetidine": [
            16,
            0.0017302909051584298
        ],
        "cinnarizine": [
            1,
            0.0012578616352201257
        ],
        "ciprofloxacin": [
            3,
            0.00021263023601956197
        ],
        "cisplatin": [
            597,
            0.010951315258465716
        ],
        "citalopram": [
            12,
            0.002369668246445498
        ],
        "citrulline": [
            2,
            0.00046253469010175765
        ],
        "cladribine": [
            4,
            0.002520478890989288
        ],
        "clarithromycin": [
            4,
            0.0006122761365375785
        ],
        "clascoterone": [
            2,
            0.1
        ],
        "clavulanic acid": [
            3,
            0.0007020828457758015
        ],
        "clindamycin": [
            3,
            0.0005110732538330494
        ],
        "clioquinol": [
            3,
            0.0030120481927710845
        ],
        "clobazam": [
            1,
            0.0019646365422396855
        ],
        "clobetasol": [
            47,
            0.03225806451612903
        ],
        "clobetasol propionate": [
            47,
            0.03225806451612903
        ],
        "clofazimine": [
            3,
            0.002390438247011952
        ],
        "clofenotane": [
            2,
            0.00023329056339671062
        ],
        "clofibrate": [
            1,
            0.00026504108136761196
        ],
        "clofibric-acid": [
            1,
            0.00020614306328592042
        ],
        "clomifene": [
            4,
            0.0007503282686175201
        ],
        "clomipramine": [
            7,
            0.0024831500532103584
        ],
        "clonazepam": [
            2,
            0.0007686395080707148
        ],
        "clonidine": [
            2,
            0.00014971180477580656
        ],
        "cloprostenol": [
            22,
            0.01455989410986102
        ],
        "clorazepic acid": [
            1,
            0.0030864197530864196
        ],
        "clotrimazole": [
            1,
            0.0005675368898978433
        ],
        "cobalamin": [
            14,
            0.0006166857545590697
        ],
        "codeine": [
            1,
            0.00013598041881968996
        ],
        "colchicine": [
            31,
            0.002011550191421712
        ],
        "combretastatin a4": [
            1,
            0.0018281535648994515
        ],
        "cortisone": [
            30,
            0.0015258633843649866
        ],
        "coumarin": [
            3,
            0.0009019843656043296
        ],
        "crizotinib": [
            1,
            0.0007062146892655367
        ],
        "cromoglicic acid": [
            1,
            0.0002442002442002442
        ],
        "cucurbitacin-i": [
            1,
            0.010416666666666666
        ],
        "cupric sulfate": [
            1,
            0.00045955882352941176
        ],
        "curcumin": [
            2,
            0.00016545334215751158
        ],
        "cyanamide": [
            1,
            0.0017301038062283738
        ],
        "cyclohexanol": [
            4,
            0.00038281175232079625
        ],
        "cyclopentolate": [
            1,
            0.00199203187250996
        ],
        "cyclophosphamide": [
            720,
            0.01306217231182308
        ],
        "cyclosporin-a": [
            104,
            0.0034863061915457075
        ],
        "cyproterone": [
            29,
            0.030818278427205102
        ],
        "cyproterone acetate": [
            51,
            0.028878822197055492
        ],
        "cysteamine": [
            2,
            0.0006297229219143577
        ],
        "cytarabine": [
            66,
            0.004388297872340426
        ],
        "dabigatran": [
            1,
            0.00029163021289005544
        ],
        "dabrafenib": [
            7,
            0.01046337817638266
        ],
        "dacarbazine": [
            48,
            0.005702744445764524
        ],
        "daclatasvir": [
            2,
            0.002881844380403458
        ],
        "dactinomycin": [
            29,
            0.001536993852024592
        ],
        "dactolisib": [
            1,
            0.002680965147453083
        ],
        "danazol": [
            3,
            0.001288659793814433
        ],
        "dantrolene": [
            4,
            0.002048131080389145
        ],
        "danusertib": [
            1,
            0.02127659574468085
        ],
        "dapsone": [
            22,
            0.0044552450384771165
        ],
        "dasatinib": [
            2,
            0.0008806693086745927
        ],
        "daunorubicin": [
            1058,
            0.015547848577474724
        ],
        "decitabine": [
            1,
            0.0002818489289740699
        ],
        "deferasirox": [
            2,
            0.00267379679144385
        ],
        "deferiprone": [
            1,
            0.0010822510822510823
        ],
        "deferoxamine": [
            2,
            0.0003069838833461243
        ],
        "deflazacort": [
            1,
            0.0023094688221709007
        ],
        "deforolimus": [
            1,
            0.009433962264150943
        ],
        "deltamethrin": [
            1,
            0.0004997501249375312
        ],
        "denibulin": [
            1,
            0.3333333333333333
        ],
        "deoxycholic acid": [
            7,
            0.0005871990604815032
        ],
        "deoxyepinephrine": [
            1,
            0.0020491803278688526
        ],
        "deoxyspergualin": [
            2,
            0.003284072249589491
        ],
        "desipramine": [
            1,
            0.00017985611510791367
        ],
        "deslorelin": [
            3,
            0.011152416356877323
        ],
        "desogestrel": [
            1,
            0.0006426735218508997
        ],
        "desonide": [
            1,
            0.00980392156862745
        ],
        "desoximetasone": [
            1,
            0.012195121951219513
        ],
        "desoxycorticosterone": [
            2,
            0.00025166729583490623
        ],
        "dexamethasone": [
            83,
            0.0015630885122410547
        ],
        "dexamethasone acetate": [
            1,
            0.0017301038062283738
        ],
        "dexamethasone isonicotinate": [
            1,
            0.02127659574468085
        ],
        "dexpanthenol": [
            3,
            0.012195121951219513
        ],
        "dexpramipexole": [
            2,
            0.002
        ],
        "dexpropranolol": [
            7,
            0.0002147766323024055
        ],
        "dextroamphetamine": [
            1,
            0.00014118311449950587
        ],
        "dexverapamil": [
            5,
            0.0002840909090909091
        ],
        "dianhydrogalactitol": [
            3,
            0.02586206896551724
        ],
        "diatrizoate": [
            1,
            0.00021177467174925878
        ],
        "diazepam": [
            2,
            0.00011168816663874462
        ],
        "diazoxide": [
            5,
            0.0017825311942959
        ],
        "dichlorophen": [
            1,
            0.010526315789473684
        ],
        "dichlorvos": [
            1,
            0.0008285004142502071
        ],
        "diclofenac": [
            3,
            0.00036452004860267317
        ],
        "didanosine": [
            3,
            0.0015290519877675841
        ],
        "dienestrol": [
            1,
            0.0053475935828877
        ],
        "dienogest": [
            4,
            0.011204481792717087
        ],
        "diethylcarbamazine": [
            1,
            0.0004847309743092584
        ],
        "diethylstilbestrol": [
            10,
            0.0011773016246762421
        ],
        "dihydrotachysterol": [
            3,
            0.004243281471004243
        ],
        "diiodohydroxyquinoline": [
            5,
            0.017006802721088437
        ],
        "dimercaprol": [
            2,
            0.0009237875288683603
        ],
        "dimercaptosuccinic acid": [
            1,
            0.00041893590280687055
        ],
        "dimethyl fumarate": [
            4,
            0.004920049200492005
        ],
        "dimethylnitrosamine": [
            1,
            0.00035486160397445
        ],
        "dinaciclib": [
            1,
            0.011363636363636364
        ],
        "dinitrochlorobenzene": [
            84,
            0.03407707910750507
        ],
        "dinoprost": [
            5,
            0.000437636761487965
        ],
        "dinoprostone": [
            12,
            0.00041905294035479815
        ],
        "diosmin": [
            1,
            0.0021413276231263384
        ],
        "diphencyprone": [
            165,
            0.559322033898305
        ],
        "diphenhydramine": [
            10,
            0.00224870699347875
        ],
        "dipicolinic acid": [
            1,
            0.0017482517482517483
        ],
        "dipyridamole": [
            1,
            0.000129886998311469
        ],
        "dixyrazine": [
            1,
            0.014492753623188406
        ],
        "dobutamine": [
            1,
            0.00016155088852988692
        ],
        "docetaxel": [
            312,
            0.027728403839317455
        ],
        "dolastatin 10": [
            1,
            0.009259259259259259
        ],
        "doramectin": [
            1,
            0.003367003367003367
        ],
        "doxepin": [
            1,
            0.0011947431302270011
        ],
        "doxifluridine": [
            12,
            0.016643550624133148
        ],
        "doxorubicin": [
            981,
            0.016316822460995976
        ],
        "doxycycline": [
            16,
            0.0015706292333366055
        ],
        "dutasteride": [
            72,
            0.10843373493975904
        ],
        "ebastine": [
            2,
            0.009950248756218905
        ],
        "edoxaban": [
            1,
            0.0012987012987012987
        ],
        "edrophonium": [
            2,
            0.002068252326783868
        ],
        "efavirenz": [
            1,
            0.00037593984962406017
        ],
        "eflornithine": [
            8,
            0.003476749239461104
        ],
        "eltrombopag": [
            1,
            0.001736111111111111
        ],
        "emodepside": [
            1,
            0.014925373134328358
        ],
        "emtricitabine": [
            1,
            0.0005868544600938967
        ],
        "enalapril": [
            2,
            0.0002959455460195324
        ],
        "enbucrilate": [
            4,
            0.0018948365703458077
        ],
        "encorafenib": [
            1,
            0.011764705882352941
        ],
        "enilconazole": [
            1,
            0.005319148936170213
        ],
        "enrofloxacin": [
            1,
            0.0008051529790660225
        ],
        "entospletinib": [
            1,
            0.045454545454545456
        ],
        "eosin": [
            1,
            0.00042301184433164127
        ],
        "epiandrosterone": [
            9,
            0.004186046511627907
        ],
        "epicatechin": [
            11,
            0.0010417653186854815
        ],
        "epigallocatechin gallate": [
            5,
            0.0010224948875255625
        ],
        "epinephrine": [
            15,
            0.00026567951965142844
        ],
        "epirubicin": [
            279,
            0.05243375305393723
        ],
        "epitestosterone": [
            1,
            0.0038022813688212928
        ],
        "eplerenone": [
            1,
            0.0010799136069114472
        ],
        "epothilone": [
            8,
            0.009060022650056626
        ],
        "equol": [
            1,
            0.0016339869281045752
        ],
        "ergocalciferol": [
            12,
            0.0027002700270027003
        ],
        "eribulin": [
            29,
            0.06041666666666667
        ],
        "erlotinib": [
            18,
            0.004377431906614786
        ],
        "erythromycin": [
            10,
            0.0003788022273570969
        ],
        "escitalopram": [
            12,
            0.002370136282836263
        ],
        "esomeprazole": [
            1,
            0.0008896797153024911
        ],
        "estradiol acetate": [
            2,
            0.003676470588235294
        ],
        "estradiol benzoate": [
            3,
            0.0016
        ],
        "estradiol valerate": [
            77,
            0.0009066076390524184
        ],
        "estramustine phosphate": [
            8,
            0.0081799591002045
        ],
        "estriol": [
            7,
            0.0011312217194570137
        ],
        "ethambutol": [
            2,
            0.0004955401387512388
        ],
        "ethanolamine": [
            20,
            9.471715090810068e-05
        ],
        "ethinylestradiol": [
            57,
            0.005254909191481516
        ],
        "ethionamide": [
            1,
            0.0007633587786259542
        ],
        "ethosuximide": [
            1,
            0.001037344398340249
        ],
        "ethylenediamine": [
            11,
            0.00022034373622851648
        ],
        "ethynodiol diacetate": [
            2,
            0.0033333333333333335
        ],
        "etidronic acid": [
            4,
            0.0014503263234227702
        ],
        "etiocholanolone": [
            3,
            0.00272975432211101
        ],
        "etiracetam": [
            2,
            0.0008329862557267805
        ],
        "etoglucid": [
            1,
            0.01282051282051282
        ],
        "etonogestrel": [
            1,
            0.0015337423312883436
        ],
        "etoposide": [
            327,
            0.019100467289719626
        ],
        "etretinate": [
            19,
            0.014074074074074074
        ],
        "eugenol": [
            1,
            0.0004100041000410004
        ],
        "everolimus": [
            4,
            0.0007840062720501764
        ],
        "exatecan": [
            4,
            0.06451612903225806
        ],
        "exemestane": [
            2,
            0.0023923444976076554
        ],
        "ezetimibe": [
            5,
            0.0021777003484320556
        ],
        "famciclovir": [
            1,
            0.001869158878504673
        ],
        "fenfluramine": [
            1,
            0.00031055900621118014
        ],
        "fenofibrate": [
            1,
            0.000361271676300578
        ],
        "fenretinide": [
            1,
            0.0012165450121654502
        ],
        "ferric chloride": [
            3,
            0.001392757660167131
        ],
        "ferrous ascorbate": [
            12,
            0.0002756719503790489
        ],
        "ferrous fumarate": [
            1,
            0.00411522633744856
        ],
        "fexofenadine": [
            4,
            0.00644122383252818
        ],
        "finasteride": [
            430,
            0.18598615916955016
        ],
        "fipronil": [
            4,
            0.004343105320304018
        ],
        "floxuridine": [
            18,
            0.005194805194805195
        ],
        "flubendazole": [
            1,
            0.004524886877828055
        ],
        "fluconazole": [
            16,
            0.0019704433497536944
        ],
        "flucytosine": [
            1,
            0.0003808073115003808
        ],
        "fludarabine": [
            12,
            0.003592814371257485
        ],
        "fludrocortisone": [
            2,
            0.0012277470841006752
        ],
        "fludroxycortide": [
            1,
            0.007936507936507936
        ],
        "fluocinolone acetonide": [
            12,
            0.008157715839564922
        ],
        "fluocinonide": [
            1,
            0.005128205128205128
        ],
        "fluocortolone": [
            2,
            0.006097560975609756
        ],
        "fluorometholone": [
            1,
            0.0031545741324921135
        ],
        "fluorouracil": [
            588,
            0.0121580547112462
        ],
        "fluoxetine": [
            13,
            0.0013810687347285669
        ],
        "flurandrenolide": [
            1,
            0.007518796992481203
        ],
        "flutamide": [
            20,
            0.007459903021260724
        ],
        "fluticasone": [
            3,
            0.0009179926560587516
        ],
        "fluvoxamine": [
            3,
            0.0015864621893178213
        ],
        "folic acid": [
            161,
            0.004079047377755257
        ],
        "formononetin": [
            1,
            0.00267379679144385
        ],
        "formycin": [
            1,
            0.0007062146892655367
        ],
        "fosbretabulin": [
            1,
            0.0018281535648994515
        ],
        "fotemustine": [
            2,
            0.007168458781362007
        ],
        "framycetin": [
            1,
            0.001976284584980237
        ],
        "fulvestrant": [
            4,
            0.0016273393002441008
        ],
        "furosemide": [
            3,
            0.0002494802494802495
        ],
        "fusidic acid": [
            3,
            0.0018226002430133657
        ],
        "fytic acid": [
            2,
            0.0005778676683039584
        ],
        "gabapentin": [
            5,
            0.00125
        ],
        "gadodiamide": [
            1,
            0.0007849293563579278
        ],
        "gadopentetic acid": [
            1,
            8.09323405632891e-05
        ],
        "gamma-hydroxybutyric acid": [
            1,
            0.0022522522522522522
        ],
        "gamma-linolenic-acid": [
            2,
            0.001594896331738437
        ],
        "ganciclovir": [
            2,
            0.000315059861373661
        ],
        "ganglioside": [
            2,
            0.00014491703499746396
        ],
        "gefitinib": [
            13,
            0.002768313458262351
        ],
        "geldanamycin": [
            1,
            0.0008710801393728223
        ],
        "gemcitabine": [
            164,
            0.014114811945950599
        ],
        "genistein": [
            2,
            0.00028772838440512156
        ],
        "gentamicin": [
            5,
            0.0002578116943384552
        ],
        "gimeracil": [
            2,
            0.021052631578947368
        ],
        "ginsenoside rb1": [
            1,
            0.00196078431372549
        ],
        "glasdegib": [
            5,
            0.10204081632653061
        ],
        "glucosamine": [
            1,
            6.756300249983109e-05
        ],
        "glutaral": [
            2,
            0.000282845424975251
        ],
        "glutethimide": [
            1,
            0.0004553734061930783
        ],
        "glycyrrhizic acid": [
            3,
            0.0016313213703099511
        ],
        "glyphosate": [
            1,
            0.00037835792659856227
        ],
        "gonadorelin": [
            27,
            0.0008188517878264034
        ],
        "goserelin": [
            6,
            0.0036809815950920245
        ],
        "grepafloxacin": [
            1,
            0.005847953216374269
        ],
        "griseofulvin": [
            53,
            0.01689512272872171
        ],
        "guanethidine": [
            2,
            0.0005292405398253506
        ],
        "gusperimus": [
            2,
            0.003284072249589491
        ],
        "haloperidol": [
            5,
            0.00031561671506122964
        ],
        "hexachlorophene": [
            1,
            0.000856898029134533
        ],
        "hexestrol": [
            1,
            0.0016611295681063123
        ],
        "hispidin": [
            1,
            0.014925373134328358
        ],
        "homoharringtonine": [
            1,
            0.0023094688221709007
        ],
        "hyaluronic acid": [
            9,
            0.00038768037906525954
        ],
        "hydrocortisone": [
            96,
            0.0012804268089363121
        ],
        "hydrocortisone aceponate": [
            1,
            0.05
        ],
        "hydrocortisone acetate": [
            1,
            0.0009930486593843098
        ],
        "hydroquinone": [
            4,
            0.0008718395815170009
        ],
        "hydroxychloroquine": [
            49,
            0.009951259138911454
        ],
        "hydroxyprogesterone": [
            36,
            0.002816460647785949
        ],
        "hydroxyproline": [
            1,
            9.24129008409574e-05
        ],
        "hydroxypropyl betadex": [
            4,
            0.002285714285714286
        ],
        "hydroxytyrosol": [
            1,
            0.0013477088948787063
        ],
        "hydroxyurea": [
            29,
            0.0033953869570307925
        ],
        "hydroxyzine": [
            8,
            0.003071017274472169
        ],
        "hymecromone": [
            1,
            0.0008635578583765112
        ],
        "hypericin": [
            2,
            0.0021668472372697724
        ],
        "ibopamine": [
            1,
            0.0032258064516129032
        ],
        "ibuprofen": [
            3,
            0.0003210616438356164
        ],
        "icotinib": [
            1,
            0.006134969325153374
        ],
        "idarubicin": [
            41,
            0.02364475201845444
        ],
        "idoxuridine": [
            2,
            0.0007069635913750442
        ],
        "ifosfamide": [
            129,
            0.026418185541675198
        ],
        "imatinib": [
            12,
            0.0011207621182404036
        ],
        "imidacloprid": [
            10,
            0.005154639175257732
        ],
        "imidazole salicylate": [
            1,
            0.0005931198102016608
        ],
        "imipramine": [
            6,
            0.0006018054162487463
        ],
        "imipramine oxide": [
            1,
            0.006993006993006993
        ],
        "imiquimod": [
            13,
            0.004686373467916366
        ],
        "indinavir": [
            7,
            0.004060324825986079
        ],
        "indirubin": [
            1,
            0.0034482758620689655
        ],
        "indisulam": [
            1,
            0.0196078431372549
        ],
        "indomethacin": [
            7,
            0.0002289976445956556
        ],
        "infigratinib": [
            1,
            0.011235955056179775
        ],
        "inosine": [
            11,
            0.001709933157158402
        ],
        "inosine pranobex": [
            8,
            0.01444043321299639
        ],
        "inositol": [
            4,
            0.00016928350755427652
        ],
        "ipi-493": [
            1,
            0.001221001221001221
        ],
        "irinotecan": [
            95,
            0.012822243217708192
        ],
        "isatin": [
            1,
            0.0010395010395010396
        ],
        "isocarboxazid": [
            1,
            0.002793296089385475
        ],
        "isoconazole": [
            1,
            0.010526315789473684
        ],
        "isoflurane": [
            1,
            0.00010711225364181663
        ],
        "isoniazid": [
            10,
            0.0005236698785085882
        ],
        "isotretinoin": [
            53,
            0.014212925717350496
        ],
        "ispinesib": [
            2,
            0.06060606060606061
        ],
        "itraconazole": [
            13,
            0.002152317880794702
        ],
        "ivermectin": [
            29,
            0.004259068879424292
        ],
        "ixabepilone": [
            8,
            0.02952029520295203
        ],
        "ketoconazole": [
            27,
            0.004742666432460917
        ],
        "ketoprofen": [
            1,
            0.00035161744022503517
        ],
        "khellin": [
            4,
            0.008032128514056224
        ],
        "kinetin": [
            1,
            0.0011560693641618498
        ],
        "kynurenic acid": [
            1,
            0.00041186161449752884
        ],
        "lamivudine": [
            7,
            0.0010570824524312897
        ],
        "lamotrigine": [
            6,
            0.0018726591760299626
        ],
        "lanosterol": [
            2,
            0.0021141649048625794
        ],
        "lansoprazole": [
            1,
            0.0004597701149425287
        ],
        "lapatinib": [
            8,
            0.0048367593712212815
        ],
        "latanoprost": [
            19,
            0.012549537648612946
        ],
        "lawsone": [
            2,
            0.00546448087431694
        ],
        "leflunomide": [
            37,
            0.02338811630847029
        ],
        "lenalidomide": [
            2,
            0.000666000666000666
        ],
        "lenvatinib": [
            1,
            0.0022624434389140274
        ],
        "letrozole": [
            5,
            0.002277904328018223
        ],
        "leucovorin": [
            149,
            0.014133940428761146
        ],
        "leuprolide": [
            6,
            0.002026342451874367
        ],
        "levacetylmethadol": [
            1,
            0.0024630541871921183
        ],
        "levamisole": [
            8,
            0.0018269011189769354
        ],
        "levetiracetam": [
            2,
            0.0008329862557267805
        ],
        "levocarnitine": [
            4,
            0.0003950617283950617
        ],
        "levocetirizine": [
            1,
            0.003745318352059925
        ],
        "levodopa": [
            4,
            0.00023849272597185786
        ],
        "levofloxacin": [
            1,
            0.0002775464890369137
        ],
        "levoleucovorin": [
            2,
            0.0625
        ],
        "levomenol": [
            1,
            0.005
        ],
        "levomepromazine": [
            2,
            0.002512562814070352
        ],
        "levonorgestrel": [
            6,
            0.0013544018058690745
        ],
        "levothyroxine": [
            60,
            0.0012185462742947664
        ],
        "liarozole": [
            2,
            0.023529411764705882
        ],
        "lidocaine": [
            6,
            0.00023951139675062872
        ],
        "linagliptin": [
            1,
            0.002012072434607646
        ],
        "lincomycin": [
            3,
            0.00039032006245121
        ],
        "lindane": [
            4,
            0.000848716316571186
        ],
        "liothyronine": [
            15,
            0.000583158385817588
        ],
        "lisinopril": [
            1,
            0.0004764173415912339
        ],
        "lithium-chloride": [
            2,
            0.0005278437582475588
        ],
        "lithocholic-acid": [
            1,
            0.0008532423208191126
        ],
        "lomustine": [
            18,
            0.007761966364812419
        ],
        "lonafarnib": [
            1,
            0.005319148936170213
        ],
        "lonidamine": [
            4,
            0.011267605633802818
        ],
        "lopinavir": [
            3,
            0.0013876040703052729
        ],
        "lorazepam": [
            1,
            0.00033967391304347825
        ],
        "lorlatinib": [
            1,
            0.008695652173913044
        ],
        "lornoxicam": [
            1,
            0.0033444816053511705
        ],
        "lovastatin": [
            14,
            0.001220788280432508
        ],
        "lufenuron": [
            1,
            0.00819672131147541
        ],
        "lurbinectedin": [
            1,
            0.023809523809523808
        ],
        "lurtotecan": [
            3,
            0.08823529411764706
        ],
        "lutetium lu 177 dotatate": [
            1,
            0.003076923076923077
        ],
        "lycopene": [
            1,
            0.0003624501631025734
        ],
        "lymecycline": [
            1,
            0.007936507936507936
        ],
        "lynestrenol": [
            2,
            0.002150537634408602
        ],
        "mannitol": [
            1,
            7.778469197261979e-05
        ],
        "maprotiline": [
            2,
            0.0022988505747126436
        ],
        "marbofloxacin": [
            1,
            0.004273504273504274
        ],
        "maxacalcitol": [
            1,
            0.0038461538461538464
        ],
        "mebendazole": [
            6,
            0.003045685279187817
        ],
        "mechlorethamine": [
            27,
            0.00483005366726297
        ],
        "medroxyprogesterone": [
            14,
            0.0019281090758848643
        ],
        "mefenamic acid": [
            1,
            0.0009149130832570906
        ],
        "megestrol": [
            11,
            0.006586826347305389
        ],
        "megestrol acetate": [
            4,
            0.004509582863585118
        ],
        "meglumine antimoniate": [
            3,
            0.0027881040892193307
        ],
        "melatonin": [
            14,
            0.000668417283361184
        ],
        "melengestrol": [
            1,
            0.004830917874396135
        ],
        "melengestrol acetate": [
            1,
            0.004830917874396135
        ],
        "melphalan": [
            28,
            0.003523785552479235
        ],
        "mephenesin": [
            1,
            0.0018018018018018018
        ],
        "meprednisone": [
            1,
            0.027777777777777776
        ],
        "meprobamate": [
            1,
            0.00043346337234503684
        ],
        "mepyramine": [
            1,
            0.0005592841163310962
        ],
        "mercaptoethanol": [
            3,
            0.000491480996068152
        ],
        "mercaptopurine": [
            84,
            0.004201260378113434
        ],
        "mesalazine": [
            16,
            0.004424778761061947
        ],
        "mesna": [
            33,
            0.02773109243697479
        ],
        "mesterolone": [
            2,
            0.015384615384615385
        ],
        "mestinon": [
            4,
            0.0023391812865497076
        ],
        "mestranol": [
            9,
            0.0036496350364963502
        ],
        "metandienone": [
            1,
            0.0012254901960784314
        ],
        "metanephrine": [
            1,
            0.0011682242990654205
        ],
        "metformin": [
            9,
            0.0005982849165724922
        ],
        "methadone": [
            1,
            7.751937984496124e-05
        ],
        "methadyl acetate": [
            1,
            0.0024630541871921183
        ],
        "methimazole": [
            4,
            0.0012084592145015106
        ],
        "methotrexate": [
            298,
            0.007590036167286434
        ],
        "methotrimeprazine": [
            2,
            0.002512562814070352
        ],
        "methoxsalen": [
            18,
            0.007398273736128237
        ],
        "methyl aminolevulinate": [
            5,
            0.006775067750677507
        ],
        "methyl nicotinate": [
            1,
            0.002932551319648094
        ],
        "methyl salicylate": [
            1,
            0.0005202913631633715
        ],
        "methyl vanillate": [
            1,
            0.5
        ],
        "methylene blue": [
            2,
            0.00019351717464925012
        ],
        "methylmalonic acid": [
            1,
            0.0006064281382656155
        ],
        "methylphenidate": [
            7,
            0.0009442870632672333
        ],
        "methylprednisolone": [
            69,
            0.0034343736001194564
        ],
        "methylprednisolone aceponate": [
            1,
            0.014705882352941176
        ],
        "methylselenocysteine": [
            1,
            0.005319148936170213
        ],
        "methyltestosterone": [
            3,
            0.0020804438280166435
        ],
        "methysergide": [
            1,
            0.00034698126301179735
        ],
        "metoclopramide": [
            2,
            0.0004091653027823241
        ],
        "metoprolol": [
            1,
            0.0001795654516071108
        ],
        "metribolone": [
            3,
            0.004172461752433936
        ],
        "metronidazole": [
            5,
            0.0003802570537683474
        ],
        "metyrapone": [
            6,
            0.001791044776119403
        ],
        "mianserin": [
            1,
            0.0003979307600477517
        ],
        "mibolerone": [
            2,
            0.013422818791946308
        ],
        "micafungin": [
            1,
            0.001059322033898305
        ],
        "miconazole": [
            2,
            0.0009775171065493646
        ],
        "midazolam": [
            2,
            0.00021795989537925023
        ],
        "mifepristone": [
            1,
            0.0001633986928104575
        ],
        "mimosine": [
            3,
            0.009009009009009009
        ],
        "minocycline": [
            10,
            0.0016233766233766235
        ],
        "minoxidil": [
            699,
            0.42083082480433476
        ],
        "mirtazapine": [
            1,
            0.0007267441860465116
        ],
        "misoprostol": [
            2,
            0.00046849379245724994
        ],
        "mitoguazone": [
            2,
            0.003003003003003003
        ],
        "mitolactol": [
            5,
            0.02702702702702703
        ],
        "mitometh": [
            1,
            0.25
        ],
        "mitomycin-c": [
            80,
            0.006496142915144133
        ],
        "mitotane": [
            9,
            0.011194029850746268
        ],
        "mitoxantrone": [
            169,
            0.03909322229932917
        ],
        "mizoribine": [
            2,
            0.0036363636363636364
        ],
        "molsidomine": [
            2,
            0.0009915716410510659
        ],
        "molybdenum": [
            1,
            0.00011849745230477545
        ],
        "mometasone": [
            9,
            0.010882708585247884
        ],
        "mometasone furoate": [
            9,
            0.010882708585247884
        ],
        "morphine": [
            2,
            5.127153404429861e-05
        ],
        "moxidectin": [
            8,
            0.009603841536614645
        ],
        "mupirocin": [
            1,
            0.000777000777000777
        ],
        "mycophenolic acid": [
            32,
            0.0038204393505253103
        ],
        "n-chlorotaurine": [
            1,
            0.004739336492890996
        ],
        "nadifloxacin": [
            1,
            0.01694915254237288
        ],
        "nadolol": [
            1,
            0.0012285012285012285
        ],
        "nafarelin": [
            1,
            0.0030581039755351682
        ],
        "naloxone": [
            7,
            0.00026714498339884746
        ],
        "naltrexone": [
            6,
            0.0007316180953542251
        ],
        "nandrolone": [
            10,
            0.003419972640218878
        ],
        "naproxen": [
            3,
            0.0007080481472740147
        ],
        "navitoclax": [
            1,
            0.003067484662576687
        ],
        "nedaplatin": [
            12,
            0.020833333333333332
        ],
        "nelfinavir": [
            2,
            0.001763668430335097
        ],
        "neomycin": [
            3,
            0.00037018756169792695
        ],
        "neon": [
            4,
            0.0044444444444444444
        ],
        "neopterin": [
            2,
            0.0007886435331230284
        ],
        "neratinib": [
            1,
            0.0047169811320754715
        ],
        "niacin": [
            7,
            0.0006435598050933162
        ],
        "niclosamide": [
            1,
            0.0012106537530266344
        ],
        "nicotinamide": [
            62,
            0.003981505265861803
        ],
        "nicotine": [
            1,
            3.769886149438287e-05
        ],
        "nicotinyl alcohol": [
            1,
            0.005952380952380952
        ],
        "nifedipine": [
            1,
            6.378364587319811e-05
        ],
        "nilotinib": [
            6,
            0.004618937644341801
        ],
        "nilutamide": [
            1,
            0.004310344827586207
        ],
        "nimodipine": [
            1,
            0.00036075036075036075
        ],
        "nimustine": [
            8,
            0.0103359173126615
        ],
        "nintedanib": [
            2,
            0.0030864197530864196
        ],
        "nirogacestat": [
            1,
            0.029411764705882353
        ],
        "nitrofurantoin": [
            3,
            0.001111934766493699
        ],
        "nitroglycerin": [
            2,
            0.0001611733419292449
        ],
        "nolatrexed": [
            1,
            0.018867924528301886
        ],
        "norethisterone": [
            6,
            0.0014170996693434106
        ],
        "norethynodrel": [
            3,
            0.0029940119760479044
        ],
        "noretynodrel": [
            3,
            0.0030120481927710845
        ],
        "norgestimate": [
            1,
            0.00546448087431694
        ],
        "norgestrel": [
            12,
            0.001955671447196871
        ],
        "noscapine": [
            1,
            0.0022123893805309734
        ],
        "nystatin": [
            2,
            0.0006251953735542357
        ],
        "ochratoxin-a": [
            1,
            0.00033783783783783786
        ],
        "octreotide": [
            6,
            0.000767067246228586
        ],
        "ofloxacin": [
            1,
            0.00013248542660307367
        ],
        "olaparib": [
            2,
            0.002034587995930824
        ],
        "oleic acid": [
            1,
            0.00012030798845043312
        ],
        "olopatadine": [
            1,
            0.0034602076124567475
        ],
        "omacetaxine mepesuccinate": [
            1,
            0.0023094688221709007
        ],
        "ombrabulin": [
            2,
            0.08
        ],
        "omeprazole": [
            7,
            0.0007215750953509947
        ],
        "ondansetron": [
            3,
            0.000942507068803016
        ],
        "ont-093": [
            1,
            0.1111111111111111
        ],
        "opipramol": [
            2,
            0.00823045267489712
        ],
        "orlistat": [
            2,
            0.001564945226917058
        ],
        "ornithine": [
            9,
            0.0013104251601630751
        ],
        "orteronel": [
            1,
            0.02564102564102564
        ],
        "osimertinib": [
            2,
            0.002717391304347826
        ],
        "oteracil": [
            26,
            0.007458405048766495
        ],
        "oxaliplatin": [
            50,
            0.006970584134950509
        ],
        "oxcarbazepine": [
            1,
            0.0009652509652509653
        ],
        "oxybutynin": [
            1,
            0.000975609756097561
        ],
        "oxyphenbutazone": [
            3,
            0.0024834437086092716
        ],
        "oxyquinoline": [
            9,
            0.003043625295908015
        ],
        "oxytetracycline": [
            5,
            0.0007676953784738216
        ],
        "p-phenylenediamine": [
            1,
            0.0011976047904191617
        ],
        "paclitaxel": [
            603,
            0.021262341325811
        ],
        "paclitaxel docosahexaenoic acid": [
            3,
            0.17647058823529413
        ],
        "palbociclib": [
            4,
            0.006006006006006006
        ],
        "pamidronic acid": [
            3,
            0.001405152224824356
        ],
        "pantothenic acid": [
            14,
            0.004723346828609987
        ],
        "papaverine": [
            1,
            0.00016700066800267202
        ],
        "paramethasone": [
            5,
            0.021739130434782608
        ],
        "paramethasone acetate": [
            3,
            0.12
        ],
        "paroxetine": [
            5,
            0.0012382367508667657
        ],
        "patupilone": [
            1,
            0.003676470588235294
        ],
        "pazopanib": [
            2,
            0.00199203187250996
        ],
        "pemetrexed": [
            22,
            0.009883198562443846
        ],
        "penicillamine": [
            8,
            0.00100150225338007
        ],
        "penicillin": [
            61,
            0.0007414970947900712
        ],
        "pentetic acid": [
            2,
            0.0001034233116144379
        ],
        "pentosan polysulfate": [
            1,
            0.001336898395721925
        ],
        "pentostatin": [
            1,
            0.0010204081632653062
        ],
        "pentoxifylline": [
            3,
            0.0007062146892655367
        ],
        "perfosfamide": [
            1,
            0.003048780487804878
        ],
        "permethrin": [
            4,
            0.0017263703064307294
        ],
        "pf-06651600": [
            2,
            0.2857142857142857
        ],
        "pf-06700841": [
            1,
            0.16666666666666666
        ],
        "phenethylamine": [
            17,
            0.00016960482076761147
        ],
        "phenindione": [
            1,
            0.001128668171557562
        ],
        "pheniramine": [
            1,
            0.0003575259206292456
        ],
        "phenobarbital": [
            9,
            0.00048221174453493356
        ],
        "phenoxybenzamine": [
            2,
            0.00040290088638195
        ],
        "phentermine": [
            1,
            0.0008361204013377926
        ],
        "phenylalanine amide": [
            5,
            0.0012462612163509472
        ],
        "phenylbutazone": [
            3,
            0.00037678975131876413
        ],
        "phenylephrine": [
            2,
            0.00014609203798392987
        ],
        "phenytoin": [
            8,
            0.0005877599000808169
        ],
        "phloxine b": [
            1,
            0.008403361344537815
        ],
        "phosphatidylethanolamine": [
            1,
            7.70891150169596e-05
        ],
        "phosphonoacetic acid": [
            1,
            0.00040160642570281126
        ],
        "picoplatin": [
            2,
            0.0392156862745098
        ],
        "pidolic acid": [
            1,
            0.00034411562284927734
        ],
        "pidorubicine": [
            279,
            0.052463332079729225
        ],
        "pilocarpine": [
            4,
            0.0005642544787699252
        ],
        "pimecrolimus": [
            7,
            0.010752688172043012
        ],
        "pimozide": [
            1,
            0.0005813953488372093
        ],
        "pioglitazone": [
            5,
            0.001268713524486171
        ],
        "pipobroman": [
            1,
            0.011494252873563218
        ],
        "piracetam": [
            2,
            0.0006180469715698393
        ],
        "pirarubicin": [
            66,
            0.0842911877394636
        ],
        "piroxicam": [
            2,
            0.0007027406886858749
        ],
        "pixantrone": [
            1,
            0.011764705882352941
        ],
        "podophyllin": [
            1,
            0.0011918951132300357
        ],
        "podophyllotoxin": [
            345,
            0.018212532333843637
        ],
        "polaprezinc": [
            1,
            0.005434782608695652
        ],
        "polymyxin b": [
            1,
            0.0002949852507374631
        ],
        "ponatinib": [
            1,
            0.002570694087403599
        ],
        "posaconazole": [
            1,
            0.0006920415224913495
        ],
        "practolol": [
            1,
            0.0006657789613848203
        ],
        "pramipexole": [
            2,
            0.002
        ],
        "prasterone": [
            56,
            0.004739336492890996
        ],
        "prasterone sulfate": [
            38,
            0.009495252373813094
        ],
        "pravastatin": [
            2,
            0.0005750431282346176
        ],
        "praziquantel": [
            3,
            0.0006898137502874224
        ],
        "prednimustine": [
            15,
            0.10416666666666667
        ],
        "prednisolone": [
            240,
            0.004582426394776034
        ],
        "prednisolone acetate": [
            1,
            0.001034126163391934
        ],
        "prednisone": [
            224,
            0.005565217391304348
        ],
        "prednisone acetate": [
            1,
            0.007518796992481203
        ],
        "pregabalin": [
            1,
            0.0004591368227731864
        ],
        "pregnenolone": [
            5,
            0.0009813542688910696
        ],
        "prilocaine": [
            1,
            0.00045578851412944393
        ],
        "primidone": [
            1,
            0.0007668711656441718
        ],
        "procaine": [
            9,
            0.0007854773957060569
        ],
        "procaine benzylpenicillin": [
            4,
            0.0022497187851518562
        ],
        "procarbazine": [
            31,
            0.009451219512195122
        ],
        "proguanil": [
            3,
            0.0022953328232593728
        ],
        "promethazine": [
            1,
            0.0003295978905735003
        ],
        "propofol": [
            1,
            6.446621970087674e-05
        ],
        "propranolol": [
            7,
            0.0002147766323024055
        ],
        "propylthiouracil": [
            4,
            0.0009394081728511038
        ],
        "prostaglandin d2": [
            8,
            0.002328288707799767
        ],
        "prostaglandin-e1": [
            1,
            0.00014190435646374344
        ],
        "protirelin": [
            10,
            0.0007799703611262772
        ],
        "protoporphyrin": [
            1,
            0.00017969451931716083
        ],
        "putrescine": [
            6,
            0.0005521811154058532
        ],
        "pyrazinamide": [
            3,
            0.0008813160987074031
        ],
        "pyridostigmine": [
            4,
            0.0023391812865497076
        ],
        "pyridoxine": [
            6,
            0.0007804370447450572
        ],
        "pyrimethamine": [
            2,
            0.0004182350480970305
        ],
        "pyrithione": [
            1,
            0.006622516556291391
        ],
        "quercetin": [
            2,
            0.00019318072056408772
        ],
        "quetiapine": [
            1,
            0.00034352456200618345
        ],
        "quinidine": [
            1,
            0.00015810276679841898
        ],
        "quinine": [
            2,
            0.0003036744609778318
        ],
        "raloxifene": [
            1,
            0.0003699593044765076
        ],
        "raltitrexed": [
            11,
            0.02127659574468085
        ],
        "ranimustine": [
            1,
            0.006134969325153374
        ],
        "ranitidine": [
            5,
            0.0009641342074816814
        ],
        "razoxane": [
            12,
            0.01327433628318584
        ],
        "regorafenib": [
            2,
            0.003067484662576687
        ],
        "remifentanil": [
            1,
            0.0002841716396703609
        ],
        "resorcinol": [
            1,
            0.0014858841010401188
        ],
        "resveratrol": [
            1,
            0.00010548523206751055
        ],
        "retinol": [
            119,
            0.0026192991723895053
        ],
        "ribavirin": [
            29,
            0.002473136619478083
        ],
        "ribociclib": [
            3,
            0.014354066985645933
        ],
        "riboflavin": [
            2,
            0.00013487086115044844
        ],
        "ridaforolimus": [
            1,
            0.009433962264150943
        ],
        "rifampicin": [
            9,
            0.0004841833440929632
        ],
        "rifamycin": [
            9,
            0.00039749138768660014
        ],
        "ripretinib": [
            1,
            0.125
        ],
        "risedronic acid": [
            3,
            0.0024855012427506215
        ],
        "risperidone": [
            1,
            0.00015532774153463808
        ],
        "ritonavir": [
            8,
            0.0016813787305590584
        ],
        "rivaroxaban": [
            3,
            0.0007772020725388601
        ],
        "rocuronium": [
            1,
            0.0005091649694501018
        ],
        "rofecoxib": [
            1,
            0.0005583472920156337
        ],
        "roflumilast": [
            1,
            0.0022935779816513763
        ],
        "ronnel": [
            1,
            0.047619047619047616
        ],
        "ropinirole": [
            1,
            0.0017152658662092624
        ],
        "ropivacaine": [
            1,
            0.0002878526194588371
        ],
        "rosiglitazone": [
            1,
            0.00023057412958266084
        ],
        "rosmarinic-acid": [
            1,
            0.0010193679918450561
        ],
        "rosuvastatin": [
            1,
            0.000375234521575985
        ],
        "roxithromycin": [
            1,
            0.0011976047904191617
        ],
        "rutin": [
            1,
            0.00027240533914464724
        ],
        "ruxolitinib": [
            28,
            0.02669208770257388
        ],
        "salicylic acid": [
            5,
            0.0005593466830741693
        ],
        "sapitinib": [
            1,
            0.038461538461538464
        ],
        "sarcosine": [
            1,
            0.0006958942240779402
        ],
        "selamectin": [
            4,
            0.024844720496894408
        ],
        "selenic acid": [
            2,
            0.002680965147453083
        ],
        "selenocysteine": [
            1,
            0.0008038585209003215
        ],
        "selumetinib": [
            1,
            0.002386634844868735
        ],
        "sertaconazole": [
            1,
            0.008849557522123894
        ],
        "sertraline": [
            6,
            0.001878522229179712
        ],
        "sevoflurane": [
            1,
            0.00015337423312883436
        ],
        "sildenafil": [
            6,
            0.001072769533345253
        ],
        "silibinin": [
            1,
            0.000992063492063492
        ],
        "silver sulfadiazine": [
            1,
            0.0010193679918450561
        ],
        "simvastatin": [
            13,
            0.0016205435053602592
        ],
        "sirolimus": [
            12,
            0.0005636978579481398
        ],
        "sitagliptin": [
            2,
            0.0012919896640826874
        ],
        "soblidotin": [
            2,
            0.031746031746031744
        ],
        "sodium aurothiomalate": [
            5,
            0.0039494470774091624
        ],
        "somatostatin": [
            2,
            0.00010276964184779816
        ],
        "sonidegib": [
            11,
            0.09565217391304348
        ],
        "sorafenib": [
            59,
            0.01097470238095238
        ],
        "sorbitol": [
            3,
            0.00017710608654584095
        ],
        "sparfosic-acid": [
            1,
            0.0021645021645021645
        ],
        "spironolactone": [
            55,
            0.007937653341030452
        ],
        "squalene": [
            3,
            0.0012510425354462051
        ],
        "squaric acid dibutyl ester": [
            87,
            0.7073170731707317
        ],
        "stanolone": [
            130,
            0.014270032930845226
        ],
        "stavudine": [
            2,
            0.0011098779134295228
        ],
        "streptomycin": [
            4,
            0.0001777382803821373
        ],
        "streptozotocin": [
            2,
            0.0001859254438969973
        ],
        "strontium ranelate": [
            3,
            0.005454545454545455
        ],
        "succinimide": [
            1,
            0.00017787264318747776
        ],
        "sugammadex": [
            1,
            0.0011376564277588168
        ],
        "sulfafurazole": [
            1,
            0.0010482180293501049
        ],
        "sulfamethoxazole": [
            5,
            0.0004457122481725798
        ],
        "sulfasalazine": [
            20,
            0.004746084480303749
        ],
        "sulfisoxazole": [
            1,
            0.0010482180293501049
        ],
        "sulfobromophthalein": [
            2,
            0.0006242197253433209
        ],
        "sulforaphane": [
            1,
            0.0006605019815059445
        ],
        "sunitinib": [
            5,
            0.0013252054068380599
        ],
        "suramin": [
            2,
            0.0006903693476009665
        ],
        "synephrine": [
            1,
            0.002688172043010753
        ],
        "tacalcitol": [
            1,
            0.004830917874396135
        ],
        "tacrolimus": [
            78,
            0.004681591741192005
        ],
        "talazoparib": [
            2,
            0.015873015873015872
        ],
        "tamoxifen": [
            46,
            0.002109414408217545
        ],
        "tanespimycin": [
            1,
            0.001221001221001221
        ],
        "tanomastat": [
            1,
            0.022222222222222223
        ],
        "tazarotene": [
            3,
            0.007556675062972292
        ],
        "technetium tc-99m": [
            2,
            9.924573243350536e-05
        ],
        "technetium tc-99m sestamibi": [
            1,
            0.0001792435920415845
        ],
        "tegafur": [
            62,
            0.010578399590513564
        ],
        "telaprevir": [
            1,
            0.0010683760683760685
        ],
        "telatinib": [
            1,
            0.14285714285714285
        ],
        "temozolomide": [
            12,
            0.002370136282836263
        ],
        "tempol": [
            5,
            0.003787878787878788
        ],
        "temsirolimus": [
            2,
            0.0023121387283236996
        ],
        "teniposide": [
            15,
            0.01485148514851485
        ],
        "tenofovir disoproxil": [
            2,
            0.0004318721658389117
        ],
        "tenoxicam": [
            1,
            0.0021231422505307855
        ],
        "terbinafine": [
            22,
            0.01150026136957658
        ],
        "terfenadine": [
            5,
            0.003069367710251688
        ],
        "teriflunomide": [
            6,
            0.013856812933025405
        ],
        "tert-butylhydroquinone": [
            1,
            0.0018587360594795538
        ],
        "testosterone enanthate": [
            3,
            0.005208333333333333
        ],
        "testosterone propionate": [
            2,
            0.0025284450063211127
        ],
        "testosterone undecanoate": [
            2,
            0.004739336492890996
        ],
        "tetracosactide": [
            2,
            0.0012345679012345679
        ],
        "tetracycline": [
            9,
            0.0004401623710079718
        ],
        "thalidomide": [
            24,
            0.0025759364602339807
        ],
        "theophylline": [
            5,
            0.00017654120471718098
        ],
        "thiamine": [
            4,
            0.0003317299718029524
        ],
        "thiamphenicol": [
            1,
            0.0010204081632653062
        ],
        "thiotepa": [
            12,
            0.004311893639956881
        ],
        "thiram": [
            1,
            0.0015174506828528073
        ],
        "thymopentin": [
            4,
            0.009174311926605505
        ],
        "tianeptine": [
            1,
            0.002232142857142857
        ],
        "tidiacic arginine": [
            15,
            0.0002543407487791644
        ],
        "timolol": [
            1,
            0.0002666666666666667
        ],
        "tioguanine": [
            6,
            0.0022988505747126436
        ],
        "tivantinib": [
            1,
            0.01020408163265306
        ],
        "tivozanib": [
            1,
            0.015151515151515152
        ],
        "tocotrienol": [
            1,
            0.0013089005235602095
        ],
        "tofacitinib": [
            80,
            0.07648183556405354
        ],
        "topiramate": [
            2,
            0.0007027406886858749
        ],
        "topotecan": [
            39,
            0.01776765375854214
        ],
        "toremifene": [
            3,
            0.00528169014084507
        ],
        "tosedostat": [
            1,
            0.047619047619047616
        ],
        "tozasertib": [
            1,
            0.006666666666666667
        ],
        "trabectedin": [
            8,
            0.01335559265442404
        ],
        "trametinib": [
            1,
            0.0013003901170351106
        ],
        "tranexamic acid": [
            2,
            0.000484613520717228
        ],
        "travoprost": [
            1,
            0.0021551724137931034
        ],
        "treosulfan": [
            5,
            0.01893939393939394
        ],
        "tretazicar": [
            1,
            0.0058823529411764705
        ],
        "tretinoin": [
            63,
            0.002773864036632617
        ],
        "triamcinolone": [
            115,
            0.01186056105610561
        ],
        "tributyrin": [
            1,
            0.003246753246753247
        ],
        "trichloroacetaldehyde": [
            1,
            0.011627906976744186
        ],
        "trichloroethylene": [
            2,
            0.0004424778761061947
        ],
        "trichostatin-a": [
            1,
            0.00032030749519538755
        ],
        "trilostane": [
            7,
            0.022292993630573247
        ],
        "trimethadione": [
            1,
            0.0020408163265306124
        ],
        "trimethoprim": [
            5,
            0.0004062728528479727
        ],
        "trimetrexate": [
            1,
            0.0027624309392265192
        ],
        "triptorelin": [
            5,
            0.002564102564102564
        ],
        "trofosfamide": [
            2,
            0.017699115044247787
        ],
        "troxacitabine": [
            2,
            0.02857142857142857
        ],
        "troxerutin": [
            1,
            0.003952569169960474
        ],
        "ubidecarenone": [
            7,
            0.0007131214343928281
        ],
        "vadimezan": [
            2,
            0.008130081300813009
        ],
        "valaciclovir": [
            1,
            0.0008944543828264759
        ],
        "valganciclovir": [
            1,
            0.001218026796589525
        ],
        "valproic acid": [
            52,
            0.003981928172141818
        ],
        "valrubicin": [
            1,
            0.012195121951219513
        ],
        "vanadium": [
            2,
            0.0005064573309698658
        ],
        "vancomycin": [
            1,
            6.731740154830023e-05
        ],
        "vandetanib": [
            3,
            0.00558659217877095
        ],
        "vatalanib": [
            1,
            0.0043859649122807015
        ],
        "vecuronium": [
            1,
            0.0004716981132075472
        ],
        "veliparib": [
            3,
            0.010948905109489052
        ],
        "vemurafenib": [
            23,
            0.015894955079474776
        ],
        "venlafaxine": [
            3,
            0.0011219147344801795
        ],
        "verapamil": [
            5,
            0.00028410705153701914
        ],
        "vidarabine": [
            12,
            0.0024834437086092716
        ],
        "vidofludimus": [
            1,
            0.1111111111111111
        ],
        "vildagliptin": [
            1,
            0.0014492753623188406
        ],
        "vinblastine": [
            231,
            0.018168947616800376
        ],
        "vincristine": [
            219,
            0.009182774959117783
        ],
        "vindesine": [
            61,
            0.047286821705426356
        ],
        "vinflunine": [
            1,
            0.005813953488372093
        ],
        "vinorelbine": [
            105,
            0.03794723527285869
        ],
        "vismodegib": [
            38,
            0.07129455909943715
        ],
        "vitamin e": [
            20,
            0.0005955571437079388
        ],
        "voriconazole": [
            4,
            0.0010309278350515464
        ],
        "vorinostat": [
            1,
            0.0005530973451327434
        ],
        "vorozole": [
            1,
            0.008620689655172414
        ],
        "warfarin": [
            8,
            0.00039420518379816696
        ],
        "wortmannin": [
            1,
            0.0002501876407305479
        ],
        "xylazine": [
            1,
            0.000543773790103317
        ],
        "zalcitabine": [
            7,
            0.0009335822886102961
        ],
        "zanamivir": [
            1,
            0.0009514747859181732
        ],
        "zearalenone": [
            1,
            0.0004139072847682119
        ],
        "zibotentan": [
            2,
            0.038461538461538464
        ],
        "zidovudine": [
            3,
            0.00031344687075540695
        ],
        "zinc chloride": [
            1,
            0.0003198976327575176
        ],
        "zoledronic acid": [
            3,
            0.0008192244675040961
        ],
        "zopiclone": [
            1,
            0.001199040767386091
        ],
        "zorubicin": [
            2,
            0.024691358024691357
        ],
        "zotepine": [
            1,
            0.00641025641025641
        ]
    },
    "query_time": 3.542969226837158,
    "return_size": 946,
    "search_term": "Alopecia"
  };
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [state, setState] = useState({
    rif: 'drugrif',
    term: '',
  });
  const handleChange = (e) => {
    setState(prev => ({...prev, [e.target.name]: e.target.value}));
  }
  const onRun = () => {
    fetch(url, 'POST', state)
  }
  return (
    <Container>
      <Card>
        <Box p={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel variant="standard" htmlFor="rif">
                Rif
              </InputLabel>
              <Select
                value={state.rif}
                id="rif"
                name="rif"
                label="Rif"
                variant="standard"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="drugrif">drugrif</MenuItem>
                <MenuItem value="autorif">autorif</MenuItem>
              </Select>
              <Box pt={2}>
                <Button color="primary"
                        onClick={onRun}
                        variant="contained"
                        disabled={!state.term.length}>
                  Run
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <InputLabel variant="standard" htmlFor="rif">
                Search term
              </InputLabel>
              <TextField
                name="term"
                variant="standard"
                fullWidth
                value={state.term}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Hr />
          {loading && <div>Loading</div>}
          {mockData && <Box pt={2}>
            {/* <ReactJson src={mockData} name={null} collapsed={false}/> */}
            <SortableTable data={mockData.drug_count}/>
          </Box>}
        </Box>
      </Card>
    </Container>
  );
}
