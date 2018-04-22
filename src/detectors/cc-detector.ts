import {Detector} from "./detector";
import {Detection} from "../models/detection";
import {isValidCreditCard} from "../util/formulas";

export class CreditCardDetector implements Detector {
    contextKeywords: string[] = [];

    contextRegex = `AMEX|AMERICAN EXPRESS|AMERICANEXPRESS|VISA|MASTERCARD|MASTER CARD|MC|MASTERCARDS|MASTER CARDS|DINER'S CLUB|DINERS CLUB|\
DINERSCLUB|DISCOVER CARD|DISCOVERCARD|DISCOVER CARDS|CARTE BLANCHE|\
CARTEBLANCHE|CREDIT CARD|CC#|BANK CARD|BANKCARD|CARD NUMBER|CARD\
NUM|CARDNUMBER|CARDNUMBERS|CARD NUMBERS|CREDITCARD|CREDIT CARDS|\
CREDITCARDS|CCN|DEBIT CARD|DEBITCARD|DEBIT CARDS|DEBITCARDS|ATM CARD|ATMCARD|ATM CARDS|ATMCARDS|CARTE BANCAIRE|CARTE DE CRÉDIT|\
CARTE DE CREDIT|NUMÉRO DE CARTE|NUMERO DE CARTE|NO DE LA CARTE|NO DE CARTE|KREDITKARTE|KARTE|KARTENINHABER|KARTENINHABERS|\
KREDITKARTENINHABER|KREDITKARTENINSTITUT|KREDITKARTENTYP|KARTENNR|\
KARTENNUMMER|KREDITKARTENNUMMER|KREDITKARTEN-NUMMER|CARTA DI CREDITO|CARTA CREDITO|NUMERO CARTA|NUMERO DELLA CARTA|\
NUMERO DI CARTA|CARTÃO DE CRÉDITO|CARTÃO DE CREDITO|CARTAO DE CRÉDITO|CARTAO DE CREDITO|\
CARTÃO DE DÉBITO|CARTAO DE DÉBITO|CARTÃO DE DEBITO|CARTAO DE DEBITO|\
DÉBITO AUTOMÁTICO|DEBITO AUTOMATICO|NÚMERO DO CARTÃO|\
NUMERO DO CARTÃO|NÚMERO DO CARTAO|NUMERO DO CARTAO|NÚMERO DE CARTÃO|NUMERO DE CARTÃO|NÚMERO DE CARTAO|NUMERO DE CARTAO`;

    ccRegex = /[0-9]{13,16}/;
    name: string = "CC";


    detect(input: string): Detection {

        const inputUpperCase = input.toLocaleUpperCase();

        if (!inputUpperCase.match(this.contextRegex)) {
            return null;
        }

        const inputNoSpaces = inputUpperCase.replace(/ /g, "");
        const ccMatches = inputNoSpaces.match(this.ccRegex);

        if (!ccMatches || ccMatches.length === 0) {
            return null;
        }
        const isValid = isValidCreditCard(ccMatches[0]);
        if(isValid) {
            return new Detection(this.name, ccMatches.index);
        }
        return null;
    }

}