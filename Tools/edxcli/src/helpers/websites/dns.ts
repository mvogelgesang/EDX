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

export const dnsReport = (sh: ScanHelper, hostname: string): Promise<any> => {
  const rrTypeValues = [
    'A',
    'AAAA',
    'ANY',
    'CAA',
    'CNAME',
    'MX',
    'NAPTR',
    'NS',
    'PTR',
    'SOA',
    'SRV',
    'TXT',
  ];

  const dnsPromisesArray = rrTypeValues.map((rrTypeVal) => {
    return getDnsValues(hostname, rrTypeVal as RrType).then((value) => {
      console.log('inner callback', value);
      return value;
    });
  });

  return Promise.all(dnsPromisesArray).then((array) => {
    return Promise.all(
      array.map((data) => {
        console.log('promise all data', data.data);
        return data;
      }),
    );
  });
};

const getDnsValues = async (
  hostname: string,
  rrtype: RrType,
): Promise<DnsDataType> => {
  let val: any;
  const obj: DnsDataType = {} as DnsDataType;

  try {
    val = await dns.resolve(hostname, rrtype.toString());
  } catch (error) {
    console.log(error);
    val = [];
  }

  obj.name = rrtype;
  obj.data = val;

  return obj;
};

export type DnsDataType = {
  name: RrType;
  data:
    | string[]
    | string[][]
    | RecordWithTtl
    | CaaRecord[]
    | MxRecord[]
    | NaptrRecord[]
    | SoaRecord
    | SrvRecord[];
};

export type RrType =
  | 'A'
  | 'AAAA'
  | 'ANY'
  | 'CAA'
  | 'CNAME'
  | 'MX'
  | 'NAPTR'
  | 'NS'
  | 'PTR'
  | 'SOA'
  | 'SRV'
  | 'TXT';
