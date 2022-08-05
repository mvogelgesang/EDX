import {
  CaaRecord,
  MxRecord,
  NaptrRecord,
  RecordWithTtl,
  SoaRecord,
  SrvRecord,
} from 'node:dns';
import dns from 'node:dns/promises';
import { ScanHelper } from './scan';

export const dnsReport = async (
  sh: ScanHelper,
  hostname: string,
): Promise<DnsDataType> => {
  const aRecord = await dns.resolve4(hostname);
  const aaaaRecord = await dns.resolve6(hostname);
  const caaRecord = await dns.resolveCaa(hostname);
  const cnameRecord = await dns.resolveCname(hostname);
  const mxRecord = await dns.resolveMx(hostname);
  const naptrRecord = await dns.resolveNaptr(hostname);
  const nsRecord = await dns.resolveNs(hostname);
  const ptrRecord = await dns.resolvePtr(hostname);
  const soaRecord = await dns.resolveSoa(hostname);
  const srvRecord = await dns.resolveSrv(hostname);
  const txtRecord = await dns.resolveTxt(hostname);

  return {
    a: aRecord,
    aaaa: aaaaRecord,
    caa: caaRecord,
    cname: cnameRecord,
    mx: mxRecord,
    naptr: naptrRecord,
    ns: nsRecord,
    ptr: ptrRecord,
    soa: soaRecord,
    srv: srvRecord,
    txt: txtRecord,
  };
};

export type DnsDataType = {
  a: string[] | RecordWithTtl;
  aaaa: string[] | RecordWithTtl;
  caa: CaaRecord[];
  cname: string[];
  mx: MxRecord[];
  naptr: NaptrRecord[];
  ns: string[];
  ptr: string[];
  soa: SoaRecord;
  srv: SrvRecord[];
  txt: string[][];
};
