#include<iostream>
#include <string>
using namespace std;

struct nilai{
    int nilai[3]={1,2,4};
    int a=0;
};

nilai mhs2;
for(int a=0; a<=3; a++){
    cout<<mhs2.nilai[a]%2<<" ";
}